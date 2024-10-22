const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

let stages = [
  {
    phone: "example@c.us",
    stage: "start",
    routes: [],
  },
];

const sessionPath = path.join(__dirname, ".wwebjs_auth");

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "5511946181209",
    dataPath: sessionPath,
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("authenticated", (session) => {
  console.log("AUTENTICADO");
});

client.on("auth_failure", (msg) => {
  console.error("Falha na autenticação", msg);
});

client.on("message", async (msg) => {
  if (msg.from === "status@broadcast") return;
  if (msg.type !== "chat") return;
  if (msg.from !== "120363351856976138@g.us") return;

  const from = msg.author;

  let user;
  if (!stages.includes(from)) {
    const obj_user = {
      phone: from,
      stage: "start",
      routes: [],
    };
    stages.push(obj_user);
    user = obj_user;
  } else {
    user = stages.find((entry) => entry.phone === from);
  }

  //   console.log(msg);
});

client.initialize();
