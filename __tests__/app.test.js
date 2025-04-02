const request = require("supertest")
// Todo: rewrite me according to NodeJS, Bad naming and importing
const app = require("../api")

describe("Test the root path", () => {
	test("It should response the GET method", () => {
		return request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200)
			})
	})
})
