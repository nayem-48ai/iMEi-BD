const { Telegraf } = require('telegraf');
const bot = new Telegraf('8445574692:AAHdgOPNM1IJUtLDGMpEwurkApUTDoaUjdw');

bot.start((ctx) => ctx.reply('স্বাগতম! /ck <imei>, /snid <nid> অথবা /tx কমান্ড ব্যবহার করুন।'));

// IMEI Check
bot.command('ck', async (ctx) => {
    const imei = ctx.message.text.split(' ')[1];
    if (!imei) return ctx.reply('❌ IMEI দিন। উদা: /ck 123456789012345');
    
    try {
        const res = await fetch('https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imei })
        });
        const data = await res.json();
        const status = data.replyMessage.msg === 'WL' ? '✅ নিবন্ধিত' : '❌ নিবন্ধিত নয়';
        ctx.reply(`📱 IMEI: ${imei}\n📢 স্ট্যাটাস: ${status}`);
    } catch (e) { ctx.reply('সার্ভার ত্রুটি!'); }
});

// NID Check
bot.command('snid', async (ctx) => {
    const nid = ctx.message.text.split(' ')[1];
    if (!nid) return ctx.reply('❌ NID দিন।');
    
    try {
        const res = await fetch('https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ docId: nid, docType: "SNID" })
        });
        const data = await res.json();
        let msg = `📂 NID: ${nid}\n\n`;
        if(Array.isArray(data.replyMessage)) {
            data.replyMessage.forEach(i => msg += `🔹 ${i.imei} (${i.regState})\n`);
        } else { msg += "কোন তথ্য পাওয়া যায়নি।"; }
        ctx.reply(msg);
    } catch (e) { ctx.reply('ত্রুটি!'); }
});

module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } else {
            res.status(200).send('Bot is running...');
        }
    } catch (e) {
        res.status(500).send('Error');
    }
};
