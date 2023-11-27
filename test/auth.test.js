import assert from "assert";
import request from "supertest";
import { app } from "../index.js";
import User from "../models/User.js";

describe("Authentication Routes", function () {
  this.timeout(5000);
  it("POST /login should return a valid token on successful login", async function () {
    const userCredentials = {
      username: "nourhen1",
      password: "123",
    };

    const res = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    // Make assertions about the response
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    assert.strictEqual(res.body.details.username, userCredentials.username);
  });
  it("POST /login should return an error for incorrect password", async function () {
    const userCredentials = {
      username: "nourhen1",
      password: "incorrect-password",
    };

    const res = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    // Make assertions about the response
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.type, "application/json");
    assert.ok(res.body.success === false, "Expected success to be false");
    assert.strictEqual(res.body.status, 400);
    assert.strictEqual(res.body.message, "Wrong password or username!");
    //assert.ok(res.body.stack, "Expected stack to be present");
  });
  it("POST /login should return an error for non-existent user", async function () {
    const userCredentials = {
      username: "non-existent-username",
      password: "password",
    };

    const res = await request(app)
      .post("/api/auth/login")
      .send(userCredentials);

    // Make assertions about the response
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.type, "application/json");
    assert.ok(res.body.success === false, "Expected success to be false");
    assert.strictEqual(res.body.status, 404);
    assert.strictEqual(res.body.message, "User not found!");
   // assert.ok(res.body.stack, "Expected stack to be present");
  });
});
