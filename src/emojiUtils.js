// emojiUtils.js

const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const emojiSet = [
  '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊',
  '😋','😎','😍','😘','🥰','😗','😙','😚','🙂','🤗',
  '🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥',
  '😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜',
  '😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️',
  '🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨',
  '😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪'
]; // 65 unique emojis

// Create maps
const charToEmoji = {};
const emojiToChar = {};
base64Chars.split('').forEach((char, idx) => {
  charToEmoji[char] = emojiSet[idx];
  emojiToChar[emojiSet[idx]] = char;
});

// Converts base64 ➔ emoji
function base64ToEmoji(base64Str) {
  return base64Str
    .split('')
    .map(char => charToEmoji[char] || '')
    .join('');
}

// Converts emoji ➔ base64
function emojiToBase64(emojiStr) {
  return Array.from(emojiStr) // handles multibyte emojis correctly
    .map(emoji => emojiToChar[emoji] || '')
    .join('');
}

module.exports = { base64ToEmoji, emojiToBase64 };
