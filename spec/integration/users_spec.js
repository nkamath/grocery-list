const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({
        force: true
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done();
      });

  });

  describe("GET /users/sign-up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign-up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Welcome to Grocery List");
        done();
      });
    });
  });

  describe("POST /users/sign-up", () => {

    it("should create a new user with valid values and redirect", (done) => {

      const options = {
        url: `${base}sign-up`,
        form: {
          name: "Example McTest",
          email: "mctest@example.com",
          password: "1234567890"
        }
      }

      request.post(options,
        (err, res, body) => {
          User.findOne({
              where: {
                email: "mctest@example.com",
              }
            })
            .then((user) => {
              expect(user).not.toBeNull();
              expect(user.email).toBe("mctest@example.com");
              expect(user.id).toBe(1);
              done();
            })
            .catch((err) => {
              done();
            });
        }
      );
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post({
          url: base,
          form: {
            name: "Example McTest",
            email: "Hello!",
            password: "1234567890"
          }
        },
        (err, res, body) => {
          User.findOne({
              where: {
                email: "Hello!"
              }
            })
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((err) => {
              done();
            });
        }
      );
    });

  });

  describe("GET /users/sign-in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign-in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });

  });
});