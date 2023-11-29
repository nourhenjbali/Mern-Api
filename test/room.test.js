import assert from "assert";
import request from "supertest";
import { app } from "../index.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

describe("Room Controller", function () {
  this.timeout(5000);

  // Test case for creating a room
  it("POST /api/hotels/rooms/65534ba926b37182fde9ef07 should create a new room", async function () {
    const newRoomData = {
        title : "room1 berlin3",
        price: "220",
        maxPeople:"2",
        desc:"this room is like the suite you can find anything in madrid",
        roomNumbers: [
            { "number": "1" }
        ]
    };

    // Assume there is an existing hotel with ID "some_hotel_id"
    const existingHotel = "65534ba926b37182fde9ef07"; // You may need to adjust this based on your data model

    const res = await request(app)
      .post(`/api/hotels/rooms/${existingHotel._id}`)
      .send(newRoomData);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    assert.property(res.body, "_id");
    assert.strictEqual(res.body.hotelId, existingHotel._id.toString());
    // Add more assertions based on your data model
  });

  // Test case for updating a room
  it("PUT /api/rooms/:id should update an existing room", async function () {
    const updatedRoomData = {
      // Add fields to update
    };

    // Assume there is an existing room with ID "some_room_id"
    const existingRoom = await Room.findOne(); // You may need to adjust this based on your data model

    const res = await request(app)
      .put(`/api/rooms/${existingRoom._id}`)
      .send(updatedRoomData);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    assert.propertyVal(res.body, "_id", existingRoom._id.toString());
    // Add more assertions based on your data model
  });

  // Test case for updating room availability
  it("PUT /api/rooms/:id/availability should update room availability", async function () {
    const updatedAvailabilityData = {
      dates: ["2023-12-01", "2023-12-02"],
    };

    // Assume there is an existing room with ID "some_room_id"
    const existingRoom = await Room.findOne(); // You may need to adjust this based on your data model

    const res = await request(app)
      .put(`/api/rooms/${existingRoom._id}/availability`)
      .send(updatedAvailabilityData);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    assert.strictEqual(res.body, "Room status has been updated.");
    // Add more assertions based on your data model
  });

  // Test case for deleting a room
  it("DELETE /api/rooms/:id should delete an existing room", async function () {
    // Assume there is an existing room with ID "some_room_id"
    const existingRoom = await Room.findOne(); // You may need to adjust this based on your data model

    const res = await request(app).delete(`/api/rooms/${existingRoom._id}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    assert.strictEqual(res.body, "Room has been deleted.");

    // Verify that the room no longer exists in the database
    const deletedRoom = await Room.findById(existingRoom._id);
    assert.isNull(deletedRoom);
  });

  // Test case for getting a room
  it("GET /api/rooms/:id should get an existing room", async function () {
    // Assume there is an existing room with ID "some_room_id"
    const existingRoom = await Room.findOne(); // You may need to adjust this based on your data model

    const res = await request(app).get(`/api/rooms/${existingRoom._id}`);

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    // Add more assertions based on your data model
  });

  // Test case for getting all rooms
  it("GET /api/rooms should get all rooms", async function () {
    const res = await request(app).get("/api/rooms");

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.type, "application/json");
    // Add more assertions based on your data model
  });
});
