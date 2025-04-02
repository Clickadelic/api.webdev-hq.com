// Installiere Jest, falls noch nicht geschehen:
// npm install --save-dev jest

const request = require("supertest")
const app = require("../api/index")

describe("Test the root path", () => {
	test("It should response the GET method", done => {
		request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200)
				done()
			})
	})
})
