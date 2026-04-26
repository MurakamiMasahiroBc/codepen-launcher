/**
 * Vercel Edge Middleware — Token Authentication
 *
 * 使い方:
 *   1. Vercel ダッシュボード → Settings → Environment Variables
 *      ACCESS_TOKEN = (任意の秘密のトークン文字列)
 *   2. Notion の埋め込み URL に ?token=YOUR_TOKEN を付ける
 *      例) https://codepen-launcher.vercel.app/?token=mysecret123
 */

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const secret = process.env.ACCESS_TOKEN;

  // ACCESS_TOKEN が未設定なら保護なし（開発中など）
  if (!secret) return;

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // トークン一致 → 通過
  if (token === secret) return;

  // 不一致 → 403
  return new Response(
    [
      '<!DOCTYPE html><html lang="ja"><head>',
      '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
      '<title>403 Unauthorized</title>',
      '<style>',
      'body{font-family:system-ui,sans-serif;background:#F4F7FA;display:flex;align-items:center;',
      'justify-content:center;min-height:100vh;margin:0;}',
      '.box{background:#fff;border:1px solid #D6E4F0;border-radius:10px;padding:40px 36px;',
      'max-width:400px;text-align:center;box-shadow:0 2px 12px rgba(9,111,202,.08);}',
      '.icon{font-size:2.4rem;margin-bottom:12px;}',
      'h1{color:#3A3E40;font-size:1.1rem;margin-bottom:8px;}',
      'p{color:#96A0A6;font-size:.82rem;line-height:1.7;}',
      'code{background:#EBF4FF;color:#096FCA;padding:2px 6px;border-radius:4px;font-size:.8rem;}',
      '</style></head><body>',
      '<div class="box">',
      '<div class="icon">🔒</div>',
      '<h1>アクセスが制限されています</h1>',
      '<p>URL に <code>?token=YOUR_TOKEN</code> を追加してアクセスしてください。</p>',
      '</div></body></html>',
    ].join(''),
    {
      status: 403,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  );
}
