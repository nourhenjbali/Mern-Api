// auth.test.mjs
import request from "supertest";
import { createServer } from "http.";
import { AddressInfo } from "net";
import { app } from "../index.js"; // Adjust the path according to your project structure

describe("Auth Route Tests", () => {
  let server;

  beforeAll(() => {
    server = createServer(app);
    server.listen();
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return a 200 status code for a valid login", async () => {
    const response = await request(server).post("/api/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(response.status).toBe(200);
    // Add more assertions based on your expected behavior
  });

  it("should return a 401 status code for an invalid login", async () => {
    const response = await request(server).post("/api/auth/login").send({
      username: "invaliduser",
      password: "invalidpassword",
    });
    expect(response.status).toBe(401);
    // Add more assertions based on your expected behavior
  });

  // Add more test cases for different scenarios
});
