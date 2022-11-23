import express, { Response, Request } from "express";
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import config from "./config/default";

const port = config.port as number;

const app = express();

// Parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser);

// API Access Policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.listen(port, async () => {
  logger.info(`Server listening at http://localhost:${port}`);

  await connect();

  routes(app);
});
