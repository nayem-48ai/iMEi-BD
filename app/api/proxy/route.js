import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    let { url, payload, token } = body;

    // যদি ইউজার লগইন না করে থাকে, তবে ডিফল্ট টোকেন জেনারেট করার লজিক
    if (!token) {
        const authRes = await fetch('https://neir.btrc.gov.bd/api/authenticate-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: "tnayem48", password: "Torikul$48" })
        });
        const authData = await authRes.json();
        token = authData.idToken;
    }

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Connection Error" }, { status: 500 });
  }
}
