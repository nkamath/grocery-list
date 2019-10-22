const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a valid name, email and password", (done) => {
      User.create({
        name: "Example McTest",
        email: "mctest@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.name).toBe("Example McTest");
        expect(user.email).toBe("mctest@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        done();
      });
    });

    it("should not create a user with missing name", (done) => {
      User.create({
        email: "mctest@example.com",
        password: "1234567890"
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("notNull Violation");
        done();
      });
    });

    it("should not create a user with missing email", (done) => {
      User.create({
        name: "Example McTest",
        password: "1234567890"
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("notNull Violation");
        done();
      });
    });
    
    it("should not create a user with invalid email", (done) => {
      User.create({
        name: "Example McTest",
        email: "Hello!",
        password: "1234567890"
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {
      User.create({
        name: "Example McTest",
        email: "mctest@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          name: "Example McFailTest",
        email: "mctest@example.com",
        password: "1234567890"
        })
        .then((user) => {

          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        done();
      });
    });

  });

});