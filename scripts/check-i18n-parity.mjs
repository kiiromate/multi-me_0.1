#!/usr/bin/env node

import fs from "fs/promises"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { createClient } from "next-sanity"
import { config as loadEnv } from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

loadEnv({ path: resolve(__dirname, "../.env.local") })

const enPath = resolve(__dirname, "../lib/i18n/locales/en.json")
const frPath = resolve(__dirname, "../lib/i18n/locales/fr.json")

function flatten(obj, prefix = "") {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return { ...acc, ...flatten(value, next) }
    }
    acc[next] = value
    return acc
  }, {})
}

async function checkUiParity() {
  const [enRaw, frRaw] = await Promise.all([fs.readFile(enPath, "utf8"), fs.readFile(frPath, "utf8")])
  const en = flatten(JSON.parse(enRaw))
  const fr = flatten(JSON.parse(frRaw))

  const enKeys = Object.keys(en)
  const frKeys = Object.keys(fr)
  const missingInFr = enKeys.filter((key) => !frKeys.includes(key))
  const missingInEn = frKeys.filter((key) => !enKeys.includes(key))
  const emptyValues = frKeys.filter((key) => fr[key] === "" || fr[key] == null)

  if (missingInFr.length || missingInEn.length || emptyValues.length) {
    console.error("UI i18n parity failed.")
    if (missingInFr.length) {
      console.error("Missing in FR:", missingInFr)
    }
    if (missingInEn.length) {
      console.error("Missing in EN:", missingInEn)
    }
    if (emptyValues.length) {
      console.error("Empty FR values:", emptyValues)
    }
    throw new Error("UI translation parity check failed.")
  }

  console.log(`UI i18n parity passed (${enKeys.length} keys).`)
}

async function checkSanityParity() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || !dataset) {
    console.log("Skipping Sanity parity check (missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET).")
    return
  }

  const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: "2024-01-01",
    perspective: "published",
  })

  const docs = await client.fetch(`
    {
      "about": *[_type == "about"]{locale},
      "projects": *[_type == "project"]{locale, translationKey},
      "posts": *[_type == "post"]{locale, translationKey},
      "capabilities": *[_type == "capability"]{locale, translationKey}
    }
  `)

  const requiredLocales = ["en", "fr"]
  const ensureBothLocales = (items, label, keyField = "translationKey") => {
    const byKey = new Map()

    for (const item of items) {
      const key = item[keyField]
      if (!key) continue
      if (!byKey.has(key)) byKey.set(key, new Set())
      byKey.get(key).add(item.locale || "en")
    }

    const errors = []
    for (const [key, locales] of byKey.entries()) {
      for (const locale of requiredLocales) {
        if (!locales.has(locale)) {
          errors.push(`${label}:${key} missing ${locale}`)
        }
      }
    }
    return errors
  }

  const aboutLocales = new Set((docs.about || []).map((doc) => doc.locale || "en"))
  const aboutErrors = requiredLocales
    .filter((locale) => !aboutLocales.has(locale))
    .map((locale) => `about missing ${locale}`)

  const parityErrors = [
    ...aboutErrors,
    ...ensureBothLocales(docs.projects || [], "project"),
    ...ensureBothLocales(docs.posts || [], "post"),
    ...ensureBothLocales(docs.capabilities || [], "capability"),
  ]

  if (parityErrors.length > 0) {
    console.error("Sanity locale parity failed:")
    for (const error of parityErrors) {
      console.error(`- ${error}`)
    }
    throw new Error("Sanity locale parity check failed.")
  }

  console.log("Sanity locale parity passed.")
}

async function run() {
  await checkUiParity()
  await checkSanityParity()
  console.log("All i18n checks passed.")
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

