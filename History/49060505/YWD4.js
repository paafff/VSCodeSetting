import express from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
// import MongoStore from "connect-mongo";
import SequelizeStore from "connect-session-sequelize";
import dbSetting from "./config/Database.js";

//routes
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import CartRoute from "./routes/CartRoute.js";

dotenv.config();

const app = express();

// mongoose.connect("mongodb://localhost:27017/dbpaafff_ap", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on
// mongoose.connection.once
// const db = mongoose.connection;
// db.on("error", (error) => {
//   console.log(error);
// });
// db.once("open", () => {
//   console.log("database connected...");
// });

(async () => {
  await dbSetting.sync();
})();

const sessionStore = SequelizeStore(session.Store);

const Store = new sessionStore({
  db: dbSetting,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", maxAge: 24 * 60 * 60 * 1000 },
    // 24 jam * 60 menit * 60 detik * 1000 milidetik
    store: Store,
    // store: MongoStore.create({
    //   mongoUrl: "mongodb://localhost:27017/dbpaafff_ap",
    //   collectionName: "sessions",
    // }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(AuthRoute);
app.use(UserRoute);
app.use(ProductRoute);
app.use(CartRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("server jalan...");
});
