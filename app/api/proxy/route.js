import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, payload, token: userToken } = await request.json();
    let finalToken = userToken;

    // যদি ইউজার লগইন না করে থাকে, তবে ডিফল্ট লগইন করে টোকেন নিবে
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "BTRC Server Error" }, { status: 500 });
  }
}
