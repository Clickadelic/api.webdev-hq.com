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
	userSchema: Joi.object({
		id: Joi.string().required(), // cuid()
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().allow(null, ""),
		emailVerified: Joi.date().allow(null),
		bio: Joi.string().allow(null, ""),
		image: Joi.string().allow(null, ""),
		role: Joi.string().required(),
		createdAt: Joi.date().required(),
		updatedAt: Joi.date().required()
	}),
	// Post
	postSchema: Joi.object({
		id: Joi.string().required(), // cuid()
		title: Joi.string().required(),
		description: Joi.string().required(),
		slug: Joi.string().required(),
		content: Joi.string().required(),
		status: Joi.boolean().required(),
		userId: Joi.string().required()
	}),
	// Link
	linkSchema: Joi.object({
		id: Joi.string().required(), // cuid()
		title: Joi.string().required(),
		description: Joi.string().optional(),
		url: Joi.string().required(),
		isPublic: Joi.boolean().default(false),
		userId: Joi.string().required()
	}),
	// Newsletter Request
	validateSubscribtion: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		agreedToSubscription: Joi.boolean().valid(true).required()
	})
}

module.exports = schemas
