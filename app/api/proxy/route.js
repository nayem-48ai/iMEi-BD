import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, payload, method = 'POST', token } = await request.json();

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13; RMX3286) AppleWebKit/537.36',
      'Accept': 'application/json, text/plain, */*',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = {
      method: method,
      headers: headers,
    };

    if (method !== 'GET' && payload) {
      fetchOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "BTRC Server Connection Failed" }, { status: 500 });
  }
}
