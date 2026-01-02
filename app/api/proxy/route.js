import { NextResponse } from 'next/server';

// ইন-মেমোরি ক্যাশ ডিফল্ট টোকেনের জন্য (পারফরম্যান্স ভালো করবে)
let cachedSystemToken = null;
let lastFetchTime = 0;

async function getSystemToken() {
  const now = Date.now();
  // যদি টোকেন থাকে এবং ১০ মিনিটের কম পুরনো হয় (৬০০,০০০ মি.লি. সেকেন্ড)
  if (cachedSystemToken && (now - lastFetchTime < 600000)) {
    return cachedSystemToken;
  }

  try {
    const res = await fetch('https://neir.btrc.gov.bd/api/authenticate-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "tnayem48", password: "Torikul$48" })
    });
    const data = await res.json();
    cachedSystemToken = data.idToken;
    lastFetchTime = Date.now();
    return cachedSystemToken;
  } catch (err) {
    return null;
  }
}

export async function POST(request) {
  try {
    const { url, payload, token: userToken } = await request.json();
    
    // যদি ইউজারের নিজস্ব টোকেন থাকে তবে সেটি নিবে, নাহলে সিস্টেম টোকেন
    const finalToken = userToken || await getSystemToken();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalToken}`,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Connection Error" }, { status: 500 });
  }
}
