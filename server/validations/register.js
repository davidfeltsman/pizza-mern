import validator from 'express-validator';

const { body } = validator;

export const registerValidations = [
  body('email', 'Введите E-mail')
    .isEmail()
    .withMessage('Некорректный E-mail')
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage('Допустимое количество символов: минимум 10, максимум 40'),
  body('username', 'Введите имя пользователя')
    .isString()
    .isLength({
      min: 3,
      max: 40,
    })
    .withMessage('Минимум 3 символа, максимум 40'),
  body('password', 'Введите пароль')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage('Минимальная допустимая длинна - 6 символов')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),
];
