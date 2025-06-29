const { Router } = require('express');
const CryptoJS = require('crypto-js');
const { base64ToEmoji } = require('../emojiUtils');

const router = Router();

router.post('/', (req, res) => {
  const { text, password } = req.body;
  if (!text || !password) {
    return res.status(400).json({ error: 'Missing text or password' });
  }

  try {
    const encryptedBase64 = CryptoJS.AES.encrypt(text, password).toString();
    const emojiEncrypted = base64ToEmoji(encryptedBase64);

    return res.json({ encrypted: emojiEncrypted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Encryption failed' });
  }
});

module.exports = router;
