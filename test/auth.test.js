import assert from "assert";
import sinon from "sinon";
import request from "supertest";
import { app } from "../index.js";
import User from "../models/User.js";

describe("Auth Controller", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "user",
      email: "user5@gmail",
      phone: "50100000",
      country: "tunsie",
      city: "tunis",
      password: "123",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, "User has been created.");
  });

  it("should login a user", async () => {
    // Mocking the User.findOne method using Sinon
    sinon.stub(User, "findOne").resolves({
      username: "nourhen1",
      password: "123", // Replace with the actual hashed password
      isAdmin: true,
    });

    const response = await request(app).post("/api/auth/login").send({
      username: "nourhen1",
      password: "123",
    });

    assert.strictEqual(response.status, 200);
    assert.ok(response.body.details);
    assert.strictEqual(response.body.isAdmin, true);
    assert.ok(response.header["set-cookie"][0].startsWith("access_token="));

    // Restore the original User.findOne method
    User.findOne.restore();
  });
});
