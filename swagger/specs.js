const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "WebDev HQ Api-Documentation",
			version: "0.1.6",
			description: "API Endpoints for https://api.webbdev-hq.com",
		},
		servers: [
			{ url: process.env.API_URL || "http://localhost:5000" },
		],
		components: {
			schemas: {
				User: {
					type: "object",
					properties: {
						id: { type: "integer", example: 1 },
						username: { type: "string", example: "JohnDev" },
						email: { type: "string", example: "john@dev.com" },
					},
				},
				Post: {
					type: "object",
					properties: {
						id: { type: "integer", example: 1 },
						title: { type: "string", example: "Mein erster Post" },
						content: { type: "string", example: "Hier steht der Inhalt..." },
					},
				},
			},
		},
	},
	apis: ["./routers/*.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
