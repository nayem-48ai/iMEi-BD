export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { endpoint, payload, token } = req.body;

    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.7499.146 Mobile Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://neir.btrc.gov.bd',
        'Referer': 'https://neir.btrc.gov.bd/',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
    };

    // যদি টোকেন থাকে তবে Authorization হেডার যোগ করো
    if (token) {
        headers['Authorization'] = `Bearer ${token.trim()}`;
    }

    try {
        const response = await fetch(`https://neir.btrc.gov.bd/services/NEIRPortalService/api/${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server Error Connection" });
    }
}
