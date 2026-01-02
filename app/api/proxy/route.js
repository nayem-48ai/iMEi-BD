import { NextResponse } from 'next/server';

export async function POST(request) {
    const { url, payload, token } = await request.json();
    
    try {
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
        return NextResponse.json({ success: false, message: "API Connection Failed" }, { status: 500 });
    }
}
