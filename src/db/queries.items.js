const Item = require("./models").Item;

module.exports = {
    getItem(id, callback) {
        return Item.findByPk(id)
          .then((item) => {
            callback(null, item);
          })
          .catch((err) => {
            callback(err);
          })
      },
    getAllItems(callback) {
        return Item.findAll()
            .then((items) => {
            callback(null, items);
            })
            .catch((err) => {
            callback(err);
            })
    }, 
    addItem(newItem, callback){
        return Item.create(newItem)
        .then((item) => {
          callback(null, item);
        })
        .catch((err) => {
          callback(err);
        })
      }, 
      updateItem(id, updatedItem, callback){
        return Item.findByPk(id)
        .then((item) => {
          if(!item){
            return callback("Item not found");
          }
          item.update(updatedItem, {
            fields: Object.keys(updatedItem)
          })
          .then(() => {
            callback(null, item);
          })
          .catch((err) => {
            callback(err);
          });
        });
      },    
    deleteItem(id, callback){
    return Item.destroy({
        where: {id}
    })
    .then((item) => {
        callback(null, item);
    })
    .catch((err) => {
        callback(err);
    })
    }
}