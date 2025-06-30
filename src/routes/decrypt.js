// routes/decrypt.js

const { Router } = require('express');
const CryptoJS = require('crypto-js');
const { emojiToBase64 } = require('../emojiUtils');

const router = Router();

router.post('/', (req, res) => {
  const { encrypted, password } = req.body;
  if (!encrypted || !password) {
    return res.status(400).json({ error: 'Missing encrypted text or password' });
  }

  try {
    const base64Str = emojiToBase64(encrypted);

    // Debug check
    if (!/^[A-Za-z0-9+/=]+$/.test(base64Str)) {
      return res.status(400).json({ error: 'Invalid data after emoji decoding.' });
    }

    const decrypted = CryptoJS.AES.decrypt(base64Str, password).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return res.status(400).json({ error: 'Decryption failed. Check password or data.' });
    }

    return res.json({ decrypted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Decryption failed.' });
  }
});

module.exports = router;
