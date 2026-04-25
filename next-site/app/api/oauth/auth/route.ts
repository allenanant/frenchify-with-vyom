import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const origin = new URL(request.url).origin
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${origin}/api/oauth/callback`,
    scope: 'repo,user',
    state: crypto.randomUUID(),
  })
  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  )
}
