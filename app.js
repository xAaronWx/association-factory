require("dotenv").config();
const Express = require("express");
const db = require("./db");

const app = Express();

// Import middlewares as a bundle
const middlewares = require("./middleware");

// Import controllers as a bundle
const controllers = require("./controllers");

// Parse the body of all requests as JSON
app.use(Express.json());

app.use("/user", controllers.User);
app.use("/address", controllers.Address);
app.use("/baby", controllers.Baby);

// add the .then(() => db.sync({force: true})) to start an append then remove after the join
db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(3005, () => {
      console.log(`[server]: App is listening on localhost:3000`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
