const { PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/mestodb', JWT_SECRET = 'secret' } = process.env;

const RegExp = {
  URL: /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/,
};

module.exports = {
  PORT,
  DATA_BASE,
  JWT_SECRET,
  RegExp,
};
