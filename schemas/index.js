const Joi = require("joi")

const schemas = {
	// Register User
	registrationSchema: Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		passwordRepeat: Joi.string().required(),
		agreedToTerms: Joi.boolean().valid(true).required()
	}),
	// Confirmation Token
	confirmationTokenSchema: Joi.object({
		token: Joi.string().required()
	}),
	// Login
	loginSchema: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}),
	// Reset Password
	resetPasswordSchema: Joi.object({
		email: Joi.string().email().required()
	}),
	// Account
	accountSchema: Joi.object({
		id: Joi.string().required(), // cuid()
		userId: Joi.string().required(),
		type: Joi.string().required(),
		provider: Joi.string().required(),
		providerAccountId: Joi.string().required(),
		refresh_token: Joi.string().allow(null, ""), // optional Text
		access_token: Joi.string().allow(null, ""), // optional Text
		expires_at: Joi.number().integer().allow(null),
		token_type: Joi.string().allow(null, ""),
		scope: Joi.string().allow(null, ""),
		id_token: Joi.string().allow(null, ""),
		session_state: Joi.string().allow(null, "")
	}),
	// Link
	linkSchema: Joi.object({
		id: Joi.string().required(), // cuid()
		title: Joi.string().required(),
		description: Joi.string().required(),
		url: Joi.string().required(),
		isPublic: Joi.boolean()
	}),
	// Newsletter Request
	validateSubscribtion: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		agreedToSubscription: Joi.boolean().valid(true).required()
	})
}

module.exports = schemas
