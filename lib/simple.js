const {
  proto,
  getContentType,
  downloadContentFromMessage,
  jidNormalizedUser,
  jidDecode,
  areJidsSameUser,
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require("fs");

function getTypeMessage(message) {
  const type = Object.keys(message);
  var restype =
    (!["senderKeyDistributionMessage", "messageContextInfo"].includes(
      type[0]
    ) &&
      type[0]) || // Sometimes message in the front
    (type.length >= 3 && type[1] !== "messageContextInfo" && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
    type[type.length - 1] ||
    Object.keys(message)[0]; // common case
  return restype;
}

/**
 * Serialize Message
 * @param {WAConnection} conn
 * @param {Object} m
 * @param {store} store
 */

async function decodeLid(participant) {
  
}
exports.smsg = (conn, m, store) => {
  if (!m) return m;
  let M = proto.WebMessageInfo;

  if (m.key) {
    m.id = m.key.id;
    m.isBaileys =
      (m.id && m.id.length === 22) ||
      (m.id?.startsWith("3EB0") && m.id.length === 22) ||
      false;

    m.chat = conn.decodeJid(m.key.remoteJid);
    m.remoteJid = conn.decodeJid(m.key.remoteJid);
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");

    if (m.isGroup) {
      m.participant = conn.decodeJid(m.key.participant || m.participant) || "";
    }

    // tentukan sender
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        ""
    );
  }

  if (m.message) {
    m.mtype = getTypeMessage(m.message);
    m.msg =
      m.mtype == "viewOnceMessage"
        ? m.message[m.mtype].message[getTypeMessage(m.message[m.mtype].message)]
        : m.message[m.mtype];
    //		m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.tex // (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''

    try {
      m.body =
        m.message.conversation ||
        m.message[m.type].text ||
        m.message[m.type].caption ||
        (m.type === "listResponseMessage" &&
          m.message[m.type].singleSelectReply.selectedRowId) ||
        (m.type === "buttonsResponseMessage" &&
          m.message[m.type].selectedButtonId) ||
        (m.type === "templateButtonReplyMessage" &&
          m.message[m.type].selectedId) ||
        "";
    } catch {
      m.body = "";
    }

    // t
    let quoted = (m.quoted =
      m.message?.protocolMessage?.type === 25 || m.msg.contextInfo
        ? m.msg.contextInfo.quotedMessage
        : null);
    //m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = Object.keys(quoted)[0];
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = (m.quoted.id && m.quoted.id.length === 22) || false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        "";
      m.quoted.mentionedJid = m.quoted.contextInfo
        ? m.quoted.contextInfo.mentionedJid
        : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.create({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup
          ? {
              participant: m.quoted.sender,
            }
          : {}),
      }));

      /**
       *
       * @returns
       */
      m.quoted.delete = () =>
        conn.sendMessage(m.quoted.chat, {
          delete: vM.key,
        });

      /**
       *
       * @param {*} jid
       * @param {*} forceForward
       * @param {*} options
       * @returns
       */
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
        conn.copyNForward(jid, vM, forceForward, options);

      /**
       *
       * @returns
       */
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  m.download = async () => {
    const quotednya = m.msg || m.quoted;
    const mimenya = quotednya.mimetype || "";
    const messageType = (m.type || mimenya.split("/")[0]).replace(
      /Message/gi,
      ""
    );
    const stream = await downloadContentFromMessage(quotednya, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };
  //m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
  m.text =
    m.msg?.text ||
    m.msg?.caption ||
    m.message?.conversation ||
    m.msg?.contentText ||
    m.msg?.selectedDisplayText ||
    m.msg?.title ||
    "";
  /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? conn.sendMedia(chatId, text, "file", "", m, { ...options })
      : conn.sendText(chatId, text, m, { ...options });
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(conn, M.create(M.toObject(m)));

  /**
   *
   * @param {*} jid
   * @param {*} forceForward
   * @param {*} options
   * @returns
   */
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
    conn.copyNForward(jid, m, forceForward, options);

  return m;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
