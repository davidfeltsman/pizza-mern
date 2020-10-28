import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
  res.send('<h2>test</h2>');
});

app.listen(3000, () => {
  console.log('server start on 3000');
});
