import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, payload, token } = await request.json();
    let finalToken = token;

    // যদি ইউজার টোকেন না থাকে, তবে অটোমেটিক আপনার ডিফল্ট টোকেন নিবে
    if (!finalToken) {
      const authRes = await fetch('https://neir.btrc.gov.bd/api/authenticate-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: "tnayem48", password: "Torikul$48" })
      });
      const authData = await authRes.json();
      finalToken = authData.idToken;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalToken}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Referer': 'https://neir.btrc.gov.bd/',
        'Origin': 'https://neir.btrc.gov.bd'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ success: false, message: "Server connection failed" }, { status: 500 });
  }
}
