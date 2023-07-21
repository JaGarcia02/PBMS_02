const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const AdminRoute = require("./Routes/AdminRoute");
const UserRoutes = require("./Routes/UserRoutes");
const HRroutes = require("./Routes/HRroute");
const SystemRouter = require("./Routes/SystemLogsRoutes");
const SystemForms = require("./Routes/SystemFormRoute");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./Middleware/errorHandler");
const path = require("path");
const db = require("./models");
var httpServer = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/admin", AdminRoute);
app.use("/api/users", UserRoutes);
app.use("/api/hr", HRroutes);
app.use("/api/form", SystemForms);

app.use("/api/system", SystemRouter);

app.use("/local_resumes", express.static("local_Resumes"));
app.use("/local_Brandings", express.static("local_Brandings"));
app.use("/local_Forms", express.static("local_Forms"));

//BELOW THIS WAS THE CODE FOR DEPLOYMENT BUT FIRST YOU NEED TO RUN ON FRONTEND
//1.npm run build
//2.then was the "dist" was created uncomment the code below then you're ready to go!
//3. In frontend side change the URL request to none because the proxy was fixed to the backend

// if (process.env.NODE_ENV === "test") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "dist", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

app.use(errorHandler);

db.sequelize.sync().then(() => {
  httpServer.listen(3001, () => {
    console.log("server running");
  });
});
