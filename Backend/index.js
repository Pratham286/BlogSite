import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import dashboardRoutes from "./routes/dashboard.js"
import commentRoutes from "./routes/commentOpertion.js"

const app = express();
dotenv.config();

connectToDB();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 

app.use("/auth", authRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/comment", commentRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})