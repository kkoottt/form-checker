import fetch from "node-fetch";

const URL = "https://bit.ly/ncmhonlinekonsulta";

async function checkWebsite() {
  try {
    const response = await fetch(URL);
    const html = await response.text();

    const closedText = "This form is no longer accepting responses";

    if (!html.includes(closedText)) {
      console.log("Form is now open.");
      await sendTelegramMessage("🚨 The form is now OPEN!!! GO! GO! GO! GO! GO! Before it CLOSES again!!!");
      process.exit(10);
    } else {
      console.log("Form closed!");
      await sendTelegramMessage("E-Konsulta form is still closed ...");
      process.exit(0);
    }

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.CHAT_ID;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

}

checkWebsite();