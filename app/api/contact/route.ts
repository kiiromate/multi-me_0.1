import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const MESSAGE_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const MESSAGE_RATE_LIMIT_MAX = 5

const submissionStore = new Map<string, number[]>()

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().default(""),
  projectType: z.string().trim().min(2).max(100),
  message: z.string().trim().min(20).max(5000),
  locale: z.enum(["en", "fr"]).optional().default("en"),
  website: z.string().trim().optional().default(""),
})

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }
  return request.headers.get("x-real-ip") || "unknown"
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const previous = submissionStore.get(key) || []
  const recent = previous.filter((timestamp) => now - timestamp < MESSAGE_RATE_LIMIT_WINDOW_MS)

  if (recent.length >= MESSAGE_RATE_LIMIT_MAX) {
    submissionStore.set(key, recent)
    return true
  }

  recent.push(now)
  submissionStore.set(key, recent)
  return false
}

async function forwardToWebhook(payload: z.infer<typeof submissionSchema>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    return
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  const bearerToken = process.env.CONTACT_WEBHOOK_BEARER_TOKEN
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "portfolio-contact-form",
      submittedAt: new Date().toISOString(),
      ...payload,
      website: undefined,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Webhook request failed with ${response.status}`)
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = submissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
    }

    // Honeypot: silent success for bots.
    if (parsed.data.website) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    await forwardToWebhook(parsed.data)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Contact submission failed:", error)
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 })
  }
}

