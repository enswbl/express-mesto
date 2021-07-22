const {
  NODE_ENV, PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/mestodb', JWT_SECRET,
} = process.env; // JWT_SECRET = 'secret'

const RegExp = {
  URL: /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/,
};

module.exports = {
  NODE_ENV,
  PORT,
  DATA_BASE,
  JWT_SECRET,
  RegExp,
};
