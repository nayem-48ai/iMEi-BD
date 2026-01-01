const BOT_TOKEN = '8445574692:AAHdgOPNM1IJUtLDGMpEwurkApUTDoaUjdw';

// Helper: টোকেন সংগ্রহ
async function fetchToken() {
    const r = await fetch("https://neir.btrc.gov.bd/api/authenticate-user", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: "tnayem48", password: "Torikul$48" })
    });
    const d = await r.json();
    return d.idToken;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).send('Bot is active');

    const { message } = req.body;
    if (!message || !message.text) return res.status(200).send('OK');

    const chatId = message.chat.id;
    const text = message.text;

    const send = async (msg) => {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' })
        });
    };

    if (text === '/start') {
        return send("📱 *NEIR Advanced Bot*\n\nকমান্ডসমূহ:\n/ck <IMEI> - স্ট্যাটাস চেক\n/snid <NID> - রেজিস্টার্ড লিস্ট\n/tx <IMEI> <OLD_NUM> <NID_4> <NEW_NUM>");
    }

    // IMEI Check Command
    if (text.startsWith('/ck')) {
        const imei = text.split(' ')[1];
        if (!imei) return send("❌ IMEI দিন। উদা: `/ck 860496059396795` ");
        const r = await fetch("https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check", {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imei })
        });
        const d = await r.json();
        const m = d.replyMessage.msg === 'WL' ? '✅ নিবন্ধিত' : '❌ নিবন্ধিত নয়';
        return send(`📱 IMEI: ${imei}\n📢 Status: ${m}`);
    }

    // NID List Command
    if (text.startsWith('/snid')) {
        const nid = text.split(' ')[1];
        if (!nid) return send("❌ NID দিন।");
        const token = await fetchToken();
        const r = await fetch("https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ docId: nid, docType: "SNID" })
        });
        const d = await r.json();
        let reply = `📂 *NID: ${nid}*\n\n`;
        if (Array.isArray(d.replyMessage)) {
            d.replyMessage.forEach(i => reply += `🔹 ${i.imei} | ${i.regState}\n`);
        } else { reply += "কোন তথ্য পাওয়া যায়নি।"; }
        return send(reply);
    }

    res.status(200).send('OK');
}
