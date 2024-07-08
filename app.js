const express = require("express");
const app = express();
const connectDb = require("./db/connectDB");
const web = require("./routes/web");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config({ path:'./.env'});

app.use(fileupload({ useTempFiles: true }));
connectDb();

const cors = require('cors')
app.use(cors())

app.use(express.json());

app.use("/api", web);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
