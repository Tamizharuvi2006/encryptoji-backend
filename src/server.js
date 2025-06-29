const express = require('express');
const cors = require('cors');
const encryptRouter = require('./routes/encrypt');
const decryptRouter = require('./routes/decrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/encrypt', encryptRouter);
app.use('/decrypt', decryptRouter);

app.get('/', (_, res) => res.send('🟢 EmojiEncrypt Backend Running'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
