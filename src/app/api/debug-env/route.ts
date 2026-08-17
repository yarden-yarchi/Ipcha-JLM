import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  return NextResponse.json({
    hasBlobToken: Boolean(token),
    blobTokenLength: token?.length ?? 0,
    blobTokenPrefix: token?.slice(0, 16) ?? null,
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    vercelEnv: process.env.VERCEL_ENV ?? null,
  })
}
