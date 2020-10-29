import express from 'express';
import { UserCtrl } from './controllers/userController.js';
import { registerValidations } from './validations/register.js';
import './core/db.js';

const app = express();

app.use(express.json());

app.get('/users', UserCtrl.index);
app.post('/users', registerValidations, UserCtrl.create);
// app.patch('/users', UserCtrl.update);
// app.delete('/users', UserCtrl.delete);

app.listen(3000, () => {
  console.log('server start on 3000');
});
