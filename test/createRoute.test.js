import assert from "assert";
import request from "supertest";
import { app } from "../index.js";
import Hotel from "../models/Hotel.js";

describe("Hotel Controller", () => {
  it("should create a new hotel", async (done) => {
    const newHotelData = {
      name: "Test Hotel",
      type: "hotel",
      city: "Test City",
      address: "Test Address",
      distance: "Test Distance",
      title: "Test Title",
      desc: "Test Description",
      rating: 4.5,
      cheapestPrice: 100,
      featured: true,
    };

    const response = await request(app).post("/api/hotels").send(newHotelData);

    assert.strictEqual(response.statusCode, 200);
    // assert.ok(response.body._id);

    // Optional: You can also check the saved hotel in the database
    const savedHotel = await Hotel.findById(response.body._id);
    assert.strictEqual(savedHotel.name, newHotelData.name);

    done();
  }).timeout(10000); // Increase the timeout if needed
});
