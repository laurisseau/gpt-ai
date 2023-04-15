import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/appointment", appointmentRoutes); 
app.use("/api", paymentRouter)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});