const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

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
                            isPurchased: false,
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

    describe("signed in user performing CRUD actions for Item", () => {

        beforeEach((done) => {    
          request.get({           // mock authentication
            url: "http://localhost:3000/auth/fake",
            form: {
              userId: this.user.id
            }
          },
            (err, res, body) => {
              done();
            }
          );
        });
   
        
        describe("GET /items", () => {

            it("should render a view with all items associated with user", (done) => {
              request.get(`${base}/items`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Tomatoes");
                done();
              });
            });
          });
        
        
        describe("POST /items/create", () => {
   
          it("should create a new item and redirect", (done) => {
            const options = {
              url: `${base}/items/create`,
              form: {
                name: "Spinach",
                userId: this.user.id
              }
            };
            request.post(options,
              (err, res, body) => {
                Item.findOne({where: {name: "Spinach"}})
                .then((item) => {
                  expect(item).not.toBeNull();
                  expect(item.name).toBe("Spinach");
                  expect(item.id).not.toBeNull();
                  done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              }
            );
          });
        });
   
        describe("POST items/:id/destroy", () => {
   
          it("should delete the item with the associated ID", (done) => {
            Item.findAll()
            .then((items) => {
              const itemCountBeforeDelete = items.length;
   
              expect(itemCountBeforeDelete).toBe(1);
   
              request.post(
               `${base}/items/${this.item.id}/destroy`,
                (err, res, body) => {
                expect(res.statusCode).toBe(303);
                Item.findAll()
                .then((items) => {
                  expect(err).toBeNull();
                  expect(items.length).toBe(itemCountBeforeDelete - 1);
                  done();
                })
   
              });
            })
   
          });
   
        });

        describe("GET /items/:id/edit", () => {

            it("should render a view with an edit item form", (done) => {
              request.get(`${base}/items/${this.item.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Item");
                expect(body).toContain(this.item.name);
                done();
              });
            });
          });
        
        
        describe("POST items/:id/update", () =>  {

            it("should update the name of the item", (done) => {
              const options = {
                url: `${base}/items/${this.item.id}/update`,
                form: {
                  name: "ToMAYtoes"
                }
              };
              request.post(options,
                (err, res, body) => {
      
                  expect(err).toBeNull();
                  Item.findOne({
                      where: {
                        id: this.item.id
                      }
                    })
                    .then((item) => {
                      expect(item.name).toBe("ToMAYtoes");
                      done();
                    });
                });
            });

            it("should update the isPurchased value of the item", (done) => {
                const options = {
                  url: `${base}/items/${this.item.id}/update`,
                  form: {
                    isPurchased: true
                  }
                };
                request.post(options,
                  (err, res, body) => {
        
                    expect(err).toBeNull();
                    Item.findOne({
                        where: {
                          id: this.item.id
                        }
                      })
                      .then((item) => {
                        expect(item.isPurchased).toBe(true);
                        done();
                      });
                  });
              });

          });

        });
});