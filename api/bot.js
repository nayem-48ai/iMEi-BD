const BOT_TOKEN = '8445574692:AAHdgOPNM1IJUtLDGMpEwurkApUTDoaUjdw';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).send('Bot is running...');

    const { message } = req.body;
    if (!message || !message.text) return res.status(200).send('OK');

    const chatId = message.chat.id;
    const text = message.text;

    const sendMsg = async (msg) => {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' })
        });
    };

    if (text.startsWith('/start')) {
        return sendMsg("👋 স্বাগতম!\n\n🔍 /ck <IMEI> - স্ট্যাটাস চেক\n🆔 /snid <NID> <TOKEN> - লিস্ট চেক\n🔄 /tx <IMEI> <OLD_NUM> <NID_4> <NEW_NUM> <TOKEN>");
    }

    if (text.startsWith('/ck')) {
        const imei = text.split(' ')[1];
        if (!imei) return sendMsg("❌ IMEI দিন। উদা: `/ck 860496059396795` ");
        
        const response = await fetch('https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imei })
        });
        const data = await response.json();
        const resMsg = data.replyMessage.msg === 'WL' ? '✅ নিবন্ধিত রয়েছে।' : '❌ নিবন্ধিত নয়।';
        return sendMsg(`📱 *IMEI:* ${imei}\n📢 *Status:* ${resMsg}`);
    }

    // NID এবং Transfer বটের মাধ্যমে করতে হলে টোকেন অনেক বড় তাই বট ইউজারকে ওয়েব ব্যবহার করতে বলা ভালো।
    // তবে বটের কোড ঠিক থাকলে এখন মেসেজ আসবে।
    res.status(200).send('OK');
}
