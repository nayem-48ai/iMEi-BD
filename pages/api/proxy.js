export default async function handler(req, res) {
    const { endpoint, payload } = req.body;
    try {
        const response = await fetch(`https://neir.btrc.gov.bd/services/NEIRPortalService/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}
