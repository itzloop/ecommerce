const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll((done) => {
  done();
});

afterAll(async (done) => {
  // Closing the DB connection allows Jest to exit successfully.
  await User.collection.drop();
  mongoose.connection.close();
  done();
});

describe("POST /users/register wrong name", function () {
  it("shoud not register a user", async (done) => {
    const res = await request(app).post("/api/users/register").send({
      name: "test",
      email: "test@example.com",
      password: "123456789",
    });
    expect(res.body.detail).toBe(
      '"name" length must be at least 6 characters long'
    );
    expect(res.status).toBe(400);
    done();
  });
});
describe("POST /users/register wrong email", function () {
  it("shoud not register a user", async (done) => {
    const res = await request(app).post("/api/users/register").send({
      name: "testtest",
      email: "testtest",
      password: "123456789",
    });
    expect(res.body.detail).toBe('"email" must be a valid email');
    expect(res.status).toBe(400);
    done();
  });
});

describe("POST /users/register wrong password", function () {
  it("shoud not register a user", async (done) => {
    const res = await request(app).post("/api/users/register").send({
      name: "testtest",
      email: "test@example.com",
      password: "129",
    });
    expect(res.body.detail).toBe(
      '"password" length must be at least 6 characters long'
    );
    expect(res.status).toBe(400);
    done();
  });
});

describe("POST /users/register", function () {
  it("shoud register a user", async (done) => {
    const res = await request(app).post("/api/users/register").send({
      name: "testtest",
      email: "test@example.com",
      password: "123456789",
    });
    expect(res.status).toBe(201);
    expect(res.body.detail).toBe("User Created!");
    done();
  });
});

describe("POST /users/login", function () {
  test("shoud log a user in", async (done) => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "123456789",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(undefined);
    done();
  });
});
