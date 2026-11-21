// Pre-Sleep Alert System (Sends Avim Hub link 2 mins before Render sleeps)
const HUB_URL = 'https://github.io';
let adminChatId = db.adminChatId || null;
let lastActivityTime = Date.now();
let sleepWarningSent = false;

// Note: When you login with /admin, save your chatId:
// db.adminChatId = chatId; saveDB();

setInterval(async () => {
  const idleMinutes = (Date.now() - lastActivityTime) / 60000;
  if (idleMinutes >= 13 && !sleepWarningSent && db.adminChatId) {
    sleepWarningSent = true;
    await tgApi('sendMessage', {
      chat_id: db.adminChatId,
      text: '⚠️ <b>Bot Sleep Alert!</b>\n13 minute se koi activity nahi hui hai. 2 minute me server so jayega—niche button dabakar <b>Avim Hub</b> se ise wapas jagayein:',
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[{ text: '⚡ Open Avim Hub & Wake Bot', url: HUB_URL }]]
      }
    });
  }
}, 60000);
