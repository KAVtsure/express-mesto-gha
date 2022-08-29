const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes/index');
const { DATA_NOT_FOUND } = require('./utils/codes');

const { PORT = 3000 } = process.env;
const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();

app.use((req, res, next) => {
  req.user = {
    _id: '6309eef45fa59239e3ae8452',
  };

  next();
});

app.use(routes);
app.use('*', (req, res) => {
  res.status(DATA_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});