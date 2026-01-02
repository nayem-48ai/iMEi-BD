import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { url, payload, token } = body;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ success: false, message: "API Server Error" }, { status: 500 });
    }
}
