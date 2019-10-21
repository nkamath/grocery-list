const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

app.use(express.static('public')); //Serves resources from public folder
appConfig.init(app,express);
routeConfig.init(app);
module.exports = app;