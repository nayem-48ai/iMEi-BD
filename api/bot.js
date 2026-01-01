const { Telegraf } = require('telegraf');
const bot = new Telegraf('8445574692:AAHdgOPNM1IJUtLDGMpEwurkApUTDoaUjdw');

bot.start((ctx) => ctx.reply('স্বাগতম! IMEI বা NID তথ্য যাচাই করতে কমান্ড লিখুন।\n/ck <IMEI>\n/snid <NID>\n/tx <IMEI> <MSISDN> <NID_Digit> <New_MSISDN>'));

// IMEI Check Command
bot.command('ck', async (ctx) => {
    const imei = ctx.message.text.split(' ')[1];
    if (!imei) return ctx.reply('দয়া করে IMEI নম্বর দিন। উদা: /ck 860496059396795');
    
    const res = await fetch('https://neir.btrc.gov.bd/services/NEIRPortalService/api/imei-status-check', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imei })
    });
    const data = await res.json();
    const msg = data.replyMessage.msg === 'WL' ? '✅ নিবন্ধিত রয়েছে এবং ব্যবহৃত হচ্ছে।' : '❌ নিবন্ধিত নয় / বৈধতা যাচাই সম্ভব নয়।';
    ctx.reply(`📱 IMEI: ${imei}\n📢 স্ট্যাটাস: ${msg}`);
});

// NID Check Command
bot.command('snid', async (ctx) => {
    const nid = ctx.message.text.split(' ')[1];
    if (!nid) return ctx.reply('দয়া করে NID নম্বর দিন।');
    
    const resReg = await fetch('https://neir.btrc.gov.bd/services/NEIRPortalService/api/doc_imei_list', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId: nid, docType: "SNID" })
    });
    const data = await resReg.json();
    
    let reply = `📂 **NID: ${nid}**\n\n✅ **Registered List:**\n`;
    if(Array.isArray(data.replyMessage)) {
        data.replyMessage.forEach(item => {
            reply += `🔹 IMEI: ${item.imei}\n   MSISDN: ${item.msisdn}\n   Date: ${item.createdAt.split('T')[0]}\n\n`;
        });
    } else {
        reply += "No data found.\n";
    }
    ctx.replyWithMarkdown(reply);
});

module.exports = async (req, res) => {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
};
