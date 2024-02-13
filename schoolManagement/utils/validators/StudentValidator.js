const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.createStudentValidator = [
  check('studentName')
    .notEmpty()
    .withMessage('student studentName required')
    .isLength({ min: 3 })
    .withMessage('Too short student studentName')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddleware,
];

exports.deleteStudentValidator = [
  check('id').isMongoId().withMessage('Invalid Admin id format'),

  validatorMiddleware,
];
exports.getSearchValidator = [
  check('id').isMongoId().withMessage('Invalid Search id format'),
  validatorMiddleware,
];
