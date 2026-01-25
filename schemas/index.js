const Joi = require("joi")

const cuidSchema = Joi.string().min(10).required()

const schemas = {

	/**
	 * ======================
	 * Auth / User
	 * ======================
	 */

	registrationSchema: Joi.object({
		username: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		passwordRepeat: Joi.string()
			.valid(Joi.ref("password"))
			.required(),
		agreedToTerms: Joi.boolean().valid(true).required()
	}),

	confirmationTokenSchema: Joi.object({
		token: Joi.string().required()
	}),

	loginSchema: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}),

	resetPasswordSchema: Joi.object({
		email: Joi.string().email().required()
	}),

	/**
	 * ======================
	 * Account (OAuth)
	 * ======================
	 */

	accountSchema: Joi.object({
		id: cuidSchema,
		userId: cuidSchema,
		type: Joi.string().required(),
		provider: Joi.string().required(),
		providerAccountId: Joi.string().required(),
		refresh_token: Joi.string().allow(null, ""),
		access_token: Joi.string().allow(null, ""),
		expires_at: Joi.number().integer().allow(null),
		token_type: Joi.string().allow(null, ""),
		scope: Joi.string().allow(null, ""),
		id_token: Joi.string().allow(null, ""),
		session_state: Joi.string().allow(null, "")
	}),

	userSchema: Joi.object({
		id: cuidSchema,
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().allow(null, ""),
		emailVerified: Joi.date().allow(null),
		bio: Joi.string().allow(null, ""),
		image: Joi.string().uri().allow(null, ""),
		role: Joi.string().valid("user", "admin").required(),
		createdAt: Joi.date().required(),
		updatedAt: Joi.date().required()
	}),

	/**
	 * ======================
	 * Post
	 * ======================
	 */

	postSchema: Joi.object({
		id: cuidSchema,
		title: Joi.string().min(3).max(255).required(),
		description: Joi.string().required(),
		slug: Joi.string().required(),
		content: Joi.string().required(),
		status: Joi.boolean().required(),
		userId: cuidSchema
	}),

	/**
	 * ======================
	 * Link (ENTITY)
	 * ======================
	 */

	linkSchema: Joi.object({
		id: cuidSchema,
		title: Joi.string().min(2).max(255).required(),
		description: Joi.string().allow(null, ""),
		url: Joi.string().uri().required(),
		isPublic: Joi.boolean().default(false),
		isFeatured: Joi.boolean().default(false),
		status: Joi.string()
			.valid("draft", "published", "archived")
			.default("draft"),
		userId: cuidSchema,
		createdAt: Joi.date(),
		updatedAt: Joi.date()
	}),

	/**
	 * ======================
	 * Link CREATE (POST)
	 * ======================
	 */

	linkCreateSchema: Joi.object({
		title: Joi.string().min(2).max(255).required(),
		url: Joi.string().uri().required(),
		description: Joi.string().allow(null, ""),
		isPublic: Joi.boolean().default(false),
		isFeatured: Joi.boolean().default(false),
		status: Joi.string()
			.valid("draft", "published")
			.default("draft")
	}),

	/**
	 * ======================
	 * Link UPDATE (PATCH)
	 * ======================
	 */

	linkUpdateSchema: Joi.object({
		title: Joi.string().min(2).max(255),
		url: Joi.string().uri(),
		description: Joi.string().allow(null, ""),
		isPublic: Joi.boolean(),
		isFeatured: Joi.boolean(),
		status: Joi.string()
			.valid("draft", "published", "archived")
	}).min(1),

	/**
	 * ======================
	 * Params
	 * ======================
	 */

	idParamSchema: Joi.object({
		id: cuidSchema
	}),

	usernameParamSchema: Joi.object({
		username: Joi.string().required()
	}),

	/**
	 * ======================
	 * Newsletter
	 * ======================
	 */

	validateSubscription: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		agreedToSubscription: Joi.boolean().valid(true).required()
	})
}

module.exports = schemas
