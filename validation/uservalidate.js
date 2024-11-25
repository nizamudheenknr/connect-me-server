import Joi from 'joi'

 const uservalidate = Joi.object({ email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'string.empty': 'Email is required.'
    }),
  
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long.',
      'string.max': 'Password must not exceed 30 characters.',
      'string.empty': 'Password is required.'
    }),

  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 character long.',
      'string.max': 'Name must not exceed 50 characters.',
      'string.empty': 'Name is required.'
    })
});


export default uservalidate
