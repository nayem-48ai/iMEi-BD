const AUTH_URL = "https://neir.btrc.gov.bd/api/authenticate-user";
const BASE_URL = "https://neir.btrc.gov.bd/services/NEIRPortalService/api";

const commonHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.7499.146 Mobile Safari/537.36',
    'Origin': 'https://neir.btrc.gov.bd',
    'Referer': 'https://neir.btrc.gov.bd/',
};

// অটোমেটিক টোকেন সংগ্রহের ফাংশন
async function getAutoToken() {
    try {
        const res = await fetch(AUTH_URL, {
            method: 'POST',
            headers: commonHeaders,
            body: JSON.stringify({ username: "tnayem48", password: "Torikul$48" })
        });
        const data = await res.json();
        return data.idToken || null;
    } catch (e) {
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ msg: "Method not allowed" });

    const { endpoint, payload } = req.body;
    let token = await getAutoToken(); // অটোমেটিক টোকেন নেয়া হচ্ছে

    if (!token) return res.status(500).json({ success: false, msg: "Authentication failed" });

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                ...commonHeaders,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}
