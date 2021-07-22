const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const { errors } = require('celebrate');

const path = require('path');

const app = express();

const { PORT, DATA_BASE } = require('./config');

const { auth } = require('./middlewares/auth');

const handleErrors = require('./middlewares/handleErrors');

const NotFoundError = require('./errors/not-found-err');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(require('./routes/signup'));
app.use(require('./routes/signin'));

app.use(auth, require('./routes/users'));
app.use(auth, require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use(handleErrors);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
