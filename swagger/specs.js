const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "WebDev HQ Api-Documentation",
			version: "0.1.6",
			description: "API Endpoints for https://api.webdev-hq.com",
		},
		servers: [
			{ url: process.env.API_URL || "http://localhost:5000" },
		],
		components: {
			schemas: {
				User: {
					type: "object",
					properties: {
						id: { type: "string", example: "43132374-5ac1-4db7-8c93-65ef4a8c6573" },
						username: { type: "string", example: "JohnDev" },
						email: { type: "string", example: "john@dev.com" },
					},
				},
				Post: {
					type: "object",
					properties: {
						id: { type: "integer", example: 1 },
						title: { type: "string", example: "My first post" },
						content: { type: "string", example: "with some content..." },
					},
				},
				Links: {
					type: "object",
					properties: {
						id: { type: "string", example: "5e542d11-bce6-4665-abd1-3d728a8c9983" },
						title: { type: "string", example: "Best Library" },
						description: { type: "string", example: "Description with some content..." },
						url: { type: "string", example: "https://mybestlibrary.com" },
						isPublic: { type: "boolean", example: "https://mybestlibrary.com" },
					},
				},
			},
		},
	},
	apis: ["./routers/*.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;