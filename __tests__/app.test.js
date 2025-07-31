const request = require("supertest")
const app = require("../app.js")

const prisma = require("../lib/prisma")
describe("API Endpoints", () => {
	describe("GET /", () => {
		test("should respond with status 200", async () => {
			const res = await request(app).get("/")
			expect(res.statusCode).toBe(200)
		})
	})
	describe("GET HealthCheck", () => {
		test("should respond with status 200", async () => {
			const res = await request(app).get("/common/v1/healthcheck")
			expect(res.statusCode).toBe(200)
		})
	})

	// describe("POST /auth/register", () => {
	// 	test("should register new user and return 200", async () => {
	// 		const res = await request(app).post("/auth/register").send({
	// 			email: "mail@tobias-hopp.de",
	// 			password: "forello204$"
	// 		})
	// 		expect(res.statusCode).toBe(200)
	// 		expect(res.body.message).toBe("register_successful")
	// 	})
	// })
	afterAll(async () => {
		await prisma.$disconnect()
	})
})
