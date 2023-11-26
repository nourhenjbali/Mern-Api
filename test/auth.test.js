import assert from "assert";
import sinon from "sinon";
import request from "supertest";
import { app } from "../index.js";
import User from "../models/User.js";

describe("Auth Controller", () => {
  it("should login a user", async () => {
    // Mocking the User.findOne method using Sinon
    /*sinon.stub(User, "findOne").resolves({
      username: "nourhen1",
      password: "123", // Replace with the actual hashed password
      isAdmin: true,
    });*/

    const response = await request(app).post("/api/auth/login").send({
      username: "nourhen1",
      password: "123",
    });
   // console.log("Response:", response.body); // Log the response body
    console.log(response.statusCode);
    assert.strictEqual(response.statusCode, 200);
    assert.ok(response.body.details);
    assert.strictEqual(response.body.isAdmin, true);
    //assert.ok(response.header["set-cookie"][0].startsWith("access_token="));

    // Restore the original User.findOne method
    // User.findOne.restore();
  }).timeout(10000);
});
// this file is auth test unitaire