import express from "express";
import routes from "./routes/api/images";
import cors from "cors";
import path from "path";
const app = express();
const port = 3000;
app.use(cors());
app.use("/api/images", routes);

// using images folder as static to return the url of the image if we want
app.use("/images", express.static(path.resolve(`assets/images`)));

app.listen(port, () =>
  console.log(`app is running on http://localhost:${port}`)
);
