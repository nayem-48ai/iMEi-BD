import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, payload, method = 'POST', token } = await request.json();

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = {
      method: method,
      headers: headers,
    };

    // শুধুমাত্র POST/PUT হলে বডি পাঠাবে, GET-এ বডি পাঠানো যাবে না
    if (method !== 'GET' && payload) {
      fetchOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "BTRC Server Error" }, { status: 500 });
  }
}
