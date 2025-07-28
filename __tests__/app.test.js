const request = require("supertest")
const app = require("../app.js")

describe("API Endpoints", () => {
	describe("GET /", () => {
		test("should respond with status 200", async () => {
			const res = await request(app).get("/")
			expect(res.statusCode).toBe(200)
		})
	})

})
