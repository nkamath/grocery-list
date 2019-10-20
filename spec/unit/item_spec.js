const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

    // Before each test, a user and item is scoped to the test context.
    beforeEach((done) => {
        this.user;
        this.item;

        sequelize.sync({
            force: true
        }).then((res) => {
            User.create({
                    name: "Testy McTester",
                    email: "example@testy.com",
                    password: "01230123"
                })
                .then((user) => {
                    this.user = user;
                    Item.create({
                            name: "Tomatoes",
                            userId: this.user.id,
                        })
                        .then((item) => {
                            this.item = item;
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe("#create()", () => {

        it("should create a item object with a body and user", (done) => {
            Item.create({ // create an item
                    name: "Potatoes",
                    isPurchased: false,
                    userId: this.user.id
                })
                .then((item) => { // confirm it was created with the values passed
                    expect(item.name).toBe("Potatoes");
                    expect(item.userId).toBe(this.user.id)
                    done();

                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a item with missing name or user", (done) => {
            Item.create({
                    name: "Leeks",
                    isPurchased: false
                })
                .then((item) => {

                    // the code in this block will not be evaluated since the validation error
                    // will skip it. Instead, we'll catch the error in the catch block below
                    // and set the expectations there

                    done();

                })
                .catch((err) => {
                    expect(err.message).toContain("Item.userId cannot be null");
                    done();
                })
        });
    });

    
    describe("#setUser()", () => {

        it("should associate an item and a user together", (done) => {

            User.create({ // create an unassociated user
                    name: "Example McTester",
                    email: "mctester@example.com",
                    password: "0123456789"
                })
                .then((newUser) => { // pass the user down

                    expect(this.item.userId).toBe(this.user.id); // confirm the item belongs to another user

                    this.item.setUser(newUser) // then reassign it
                        .then((item) => {
                            expect(item.userId).toBe(newUser.id); // confirm the values persisted
                            done();
                        });
                })
        });

    });

    describe("#getUser()", () => {

        it("should return the associated user", (done) => {
            this.item.getUser()
                .then((associatedUser) => {
                    expect(associatedUser.email).toBe("example@testy.com");
                    done();
                });
        });

    });
});