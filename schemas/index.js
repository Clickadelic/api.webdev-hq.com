const Joi = require("joi")

// Register
export const registerSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	passwordRepeat: Joi.string().required(),
	agreedToTerms: Joi.boolean().valid(true).required()
})

// Login
export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
})

// Reset Password
export const resetPasswordSchema = Joi.object({
	email: Joi.string().email().required()
})
