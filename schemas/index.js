const Joi = require("joi")

export const infoSchema = Joi.object({
	title: Joi.string().required(),
	version: Joi.string().required(),
	website: Joi.string().uri().required(),
	platform: Joi.string().uri().required(),
	license: Joi.string().valid("MIT", "Apache-2.0", "GPL-3.0").required(),
	contact: Joi.string().email().required(),
	schema: Joi.string().uri().required(),
	author: Joi.string().required()
})

export const userSchema = Joi.object({
	id: Joi.string().required(), // cuid() ist ein String
	username: Joi.string().allow(null, ""),
	bio: Joi.string().allow(null, ""),
	email: Joi.string().email().allow(null, ""),
	emailVerified: Joi.date().allow(null),
	image: Joi.string().uri().allow(null, ""),
	backgroundImage: Joi.string().uri().allow(null, ""),
	password: Joi.string().allow(null, ""),
	role: Joi.string().valid("USER", "ADMIN").default("USER"),
	isTwoFactorEnabled: Joi.boolean().default(false),
	createdAt: Joi.date().default(() => new Date(), "current date"),
	updatedAt: Joi.date().default(() => new Date(), "current date"),

	// Nested relations (foreign keys) – je nach Verwendung evtl. detaillierter definieren:
	accounts: Joi.array().items(Joi.any()), // besser: spezifisches AccountSchema
	twoFactorConfirmation: Joi.any().allow(null), // optionales Subschema möglich
	Organization: Joi.array().items(Joi.any()),
	Link: Joi.array().items(Joi.any())
})

export const organizationSchema = Joi.object({
	id: Joi.string().required(), // cuid() ist ein String
	name: Joi.string().required(),
	url: Joi.string().uri().required(),
	image: Joi.string().uri().allow(null, ""),
	description: Joi.string().allow(null, ""),
	createdAt: Joi.date().default(() => new Date(), "current date"),
	updatedAt: Joi.date().default(() => new Date(), "current date"),
	userId: Joi.string().required(), // foreign key zu User
	links: Joi.array().items(Joi.string().uri()).allow(null, []) // Array von Links (URLs)
	// Optional: weitere Felder für Organisationen, z.B. Mitglieder, Rollen etc.
	// members: Joi.array().items(Joi.string()).allow(null, []) // Array von User IDs
})

export const linkSchema = Joi.object({
	id: Joi.string().required(), // cuid() ist ein String
	title: Joi.string().required(),
	description: Joi.string().required(),
	url: Joi.string().uri().required(),
	image: Joi.string().uri().allow(null, ""),
	createdAt: Joi.date().default(() => new Date(), "current date"),
	updatedAt: Joi.date().default(() => new Date(), "current date"),
	userId: Joi.string().required() // foreign key zu User
})

export const accountSchema = Joi.object({
	id: Joi.string().required(), // cuid() ist ein String
	userId: Joi.string().required(), // foreign key zu User
	provider: Joi.string().required(),
	providerAccountId: Joi.string().required(),
	refresh_token: Joi.string().allow(null, ""),
	access_token: Joi.string().allow(null, ""),
	expires_at: Joi.number().allow(null),
	token_type: Joi.string().allow(null, ""),
	scope: Joi.string().allow(null, ""),
	id_token: Joi.string().allow(null, ""),
	session_state: Joi.string().allow(null, ""),
	createdAt: Joi.date().default(() => new Date(), "current date"),
	updatedAt: Joi.date().default(() => new Date(), "current date")
})
