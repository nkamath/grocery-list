const itemQueries = require("../db/queries.items.js");

module.exports = {
    index(req, res, next){
        itemQueries.getAllItems((err,items)=>{
            if(err){
                res.redirect(500, "/");
            } else{
                res.render("items/index", {items});
            }
        });
    },
    new(req, res, next){
        res.render("items/new");
    },
    create(req, res, next){
        let newItem = {
          name: req.body.name,
          userId: req.user.id
        };
        itemQueries.addItem(newItem, (err, item) => {
          if(err){
            res.redirect(500, "/items/new");
          } else {
            res.redirect(303, `/items`);
          }
        });
      }, 
    edit(req, res, next){
        itemQueries.getItem(req.params.id, (err, item) => {
            if(err || item == null){
            res.redirect(404, "/items");
            } else {
            res.render(`items/edit`, {item});
            }
        });
    },
    update(req, res, next){
            itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if(err || item == null){
                res.redirect(404, `/items/${req.params.id}/edit`);
            } else {
                res.redirect(`/items`);
            }
            });
        },             
    destroy(req, res, next){
        itemQueries.deleteItem(req.params.id, (err, item) => {
            if(err){
            res.redirect(500, `/items`)
            } else {
            res.redirect(303, "/items")
            }
        });
    }
       
}