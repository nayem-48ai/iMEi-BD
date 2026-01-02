import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { url, payload, token } = await request.json();
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://neir.btrc.gov.bd/',
                'Origin': 'https://neir.btrc.gov.bd'
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ success: false, message: "BTRC API Down" }, { status: 500 });
    }
}
