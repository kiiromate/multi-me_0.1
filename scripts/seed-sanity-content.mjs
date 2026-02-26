#!/usr/bin/env node

import { createClient } from "@sanity/client"
import { config as loadEnv } from "dotenv"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

loadEnv({ path: resolve(__dirname, "../.env.local") })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error("Missing required env vars for seeding:")
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID")
  console.error("- NEXT_PUBLIC_SANITY_DATASET")
  console.error("- SANITY_API_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
})

const block = (text) => ({
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text }],
})

const bullet = (text) => ({
  _type: "block",
  style: "normal",
  listItem: "bullet",
  children: [{ _type: "span", text }],
})

const documents = [
  {
    _id: "about-en",
    _type: "about",
    locale: "en",
    name: "KAZE KEZA",
    title: "Creative Technologist",
    heroTitle: "Making complex systems simple and reliable.",
    heroSupport:
      "I connect data, design, and code to build resilient digital systems with clear outcomes.",
    positioning: {
      howIThink: [block("I start from operational reality and user friction, then design systems teams can truly run.")],
      whatIBuild: [block("I build reliable product workflows, scalable content systems, and data-informed UX improvements.")],
      howIWork: [bullet("Audit the real workflow first."), bullet("Keep architecture simple."), bullet("Protect production with quality gates.")],
    },
    bioVariants: {
      oneLiner: "Creative technologist designing reliable digital experiences.",
      short: "I help teams transform unclear processes into maintainable digital systems using thoughtful architecture and practical delivery.",
      bio150: "I design and implement resilient digital systems that connect product, content, and operations without unnecessary complexity.",
    },
    location: "Remote",
    availability: "open",
    ctaEmail: "jonathan@kazekeza.com",
    ctaText: "Open to project collaboration and mission-aligned product work.",
    socialLinks: {
      github: "https://github.com/kazekeza",
      linkedin: "https://linkedin.com/in/kazekeza",
      twitter: "https://twitter.com/kazekeza",
      email: "jonathan@kazekeza.com",
      website: "https://kazekeza.com",
    },
  },
  {
    _id: "about-fr",
    _type: "about",
    locale: "fr",
    name: "KAZE KEZA",
    title: "Technologue créatif",
    heroTitle: "Rendre les systèmes complexes simples et fiables.",
    heroSupport:
      "Je relie la donnée, le design et le code pour construire des systèmes numériques robustes avec des résultats concrets.",
    positioning: {
      howIThink: [block("Je pars de la réalité opérationnelle et des frictions utilisateur, puis je conçois des systèmes réellement exploitables.")],
      whatIBuild: [block("Je construis des workflows produit fiables, des systèmes de contenu évolutifs et des améliorations UX pilotées par la donnée.")],
      howIWork: [bullet("Auditer d'abord le workflow réel."), bullet("Garder une architecture simple."), bullet("Protéger la production avec des garde-fous qualité.")],
    },
    bioVariants: {
      oneLiner: "Technologue créatif qui conçoit des expériences numériques fiables.",
      short: "J'aide les équipes à transformer des processus flous en systèmes numériques maintenables grâce à une architecture claire et une exécution pragmatique.",
      bio150: "Je conçois et implémente des systèmes numériques résilients qui relient produit, contenu et opérations sans complexité inutile.",
    },
    location: "À distance",
    availability: "open",
    ctaEmail: "jonathan@kazekeza.com",
    ctaText: "Disponible pour des collaborations projet et des missions à impact.",
    socialLinks: {
      github: "https://github.com/kazekeza",
      linkedin: "https://linkedin.com/in/kazekeza",
      twitter: "https://twitter.com/kazekeza",
      email: "jonathan@kazekeza.com",
      website: "https://kazekeza.com",
    },
  },
  {
    _id: "capability-systems-en",
    _type: "capability",
    locale: "en",
    translationKey: "capability-systems",
    title: "Systems Design",
    description: "Structuring reliable product and content workflows that teams can sustain.",
    iconName: "Network",
  },
  {
    _id: "capability-systems-fr",
    _type: "capability",
    locale: "fr",
    translationKey: "capability-systems",
    title: "Conception de systèmes",
    description: "Structurer des workflows produit et contenu fiables et durables pour les équipes.",
    iconName: "Network",
  },
  {
    _id: "capability-data-viz-en",
    _type: "capability",
    locale: "en",
    translationKey: "capability-data-viz",
    title: "Data Visualization",
    description: "Turning complex datasets into clear visual narratives for decision-making.",
    iconName: "BarChart3",
  },
  {
    _id: "capability-data-viz-fr",
    _type: "capability",
    locale: "fr",
    translationKey: "capability-data-viz",
    title: "Visualisation de données",
    description: "Transformer des jeux de données complexes en récits visuels clairs pour la décision.",
    iconName: "BarChart3",
  },
  {
    _id: "project-ops-pipeline-en",
    _type: "project",
    locale: "en",
    translationKey: "project-ops-pipeline",
    category: "commercial",
    title: "Customer Operations Pipeline",
    slug: { _type: "slug", current: "customer-operations-pipeline" },
    description: "A practical pipeline system that improved response speed and delivery visibility.",
    caseStudy: [
      block("Context: fragmented communication created delays and hidden risk."),
      block("Action: standardized intake, automation triggers, and weekly review rhythm."),
      block("Outcome: faster response cycles and clearer operational accountability."),
    ],
    tags: ["Operations", "Automation", "Delivery"],
    status: "live",
    featured: true,
    year: 2025,
    order: 1,
    publishedAt: "2025-11-01T09:00:00.000Z",
  },
  {
    _id: "project-ops-pipeline-fr",
    _type: "project",
    locale: "fr",
    translationKey: "project-ops-pipeline",
    category: "commercial",
    title: "Pipeline d'opérations client",
    slug: { _type: "slug", current: "customer-operations-pipeline" },
    description: "Un système de pipeline pragmatique qui a amélioré la réactivité et la visibilité de livraison.",
    caseStudy: [
      block("Contexte : communication fragmentée, retards, et risques peu visibles."),
      block("Action : standardisation de l'entrée, déclencheurs d'automatisation et revue hebdomadaire."),
      block("Résultat : cycles de réponse plus rapides et meilleure responsabilité opérationnelle."),
    ],
    tags: ["Opérations", "Automatisation", "Delivery"],
    status: "live",
    featured: true,
    year: 2025,
    order: 1,
    publishedAt: "2025-11-01T09:00:00.000Z",
  },
  {
    _id: "post-release-notes-en",
    _type: "post",
    locale: "en",
    translationKey: "post-release-notes",
    title: "Building Multi-Me: Reliability First",
    slug: { _type: "slug", current: "building-multi-me-reliability-first" },
    excerpt: "How this portfolio evolved from visual concept to reliable product delivery.",
    content: [
      block("This release focuses on reliability: route stability, CMS consistency, and safer production defaults."),
      block("The goal is simple: make the system repeatable, testable, and easy to evolve."),
    ],
    tags: ["Release", "Reliability", "Sanity"],
    featured: true,
    readTime: 4,
    publishedAt: "2025-11-10T09:00:00.000Z",
  },
  {
    _id: "post-release-notes-fr",
    _type: "post",
    locale: "fr",
    translationKey: "post-release-notes",
    title: "Construire Multi-Me : fiabilité d'abord",
    slug: { _type: "slug", current: "building-multi-me-reliability-first" },
    excerpt: "Comment ce portfolio est passé d'un concept visuel à une livraison produit fiable.",
    content: [
      block("Cette version se concentre sur la fiabilité : stabilité des routes, cohérence CMS et paramètres de production plus sûrs."),
      block("Objectif : un système répétable, testable et facile à faire évoluer."),
    ],
    tags: ["Release", "Fiabilité", "Sanity"],
    featured: true,
    readTime: 4,
    publishedAt: "2025-11-10T09:00:00.000Z",
  },
]

async function seedContent() {
  console.log(`Seeding ${documents.length} documents into ${projectId}/${dataset}...`)

  for (const document of documents) {
    await client.createOrReplace(document)
    console.log(`upserted: ${document._id}`)
  }

  console.log("Done. Seed is idempotent and safe to re-run.")
}

seedContent().catch((error) => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  console.error("Seed failed:", errorMessage)
  process.exit(1)
})

