import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = new URL(request.url).searchParams.get('code')

  if (!code) {
    return new NextResponse('Missing code', { status: 400 })
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const data = await res.json()

  if (data.error) {
    return new NextResponse(`GitHub OAuth error: ${data.error_description}`, { status: 400 })
  }

  const token = String(data.access_token).replace(/[^a-zA-Z0-9_]/g, '')

  const html = `<!doctype html><html><body><script>
(function () {
  var token = "${token}";
  function onMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' }),
      e.origin
    );
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
<\/script></body></html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
