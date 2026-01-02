const DEFAULT_USER = { username: "tnayem48", password: "Torikul$48" };

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    let { endpoint, payload, token, isLogin } = req.body;

    // Login logic for Automate Token
    if (isLogin) {
        try {
            const loginRes = await fetch('https://neir.btrc.gov.bd/api/authenticate-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const loginData = await loginRes.json();
            return res.status(200).json(loginData);
        } catch (e) { return res.status(500).json({ status: false, message: "Login Failed" }); }
    }

    // Default Token Logic (যদি ইউজার লগইন না থাকে)
    if (!token) {
        const authRes = await fetch('https://neir.btrc.gov.bd/api/authenticate-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(DEFAULT_USER)
        });
        const authData = await authRes.json();
        token = authData.idToken;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
        'Origin': 'https://neir.btrc.gov.bd',
        'Referer': 'https://neir.btrc.gov.bd/'
    };

    try {
        const response = await fetch(`https://neir.btrc.gov.bd/services/NEIRPortalService/api/${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, msg: "Connection Error" });
    }
}
