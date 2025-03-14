const express = require("express"); //tạo server
const app = express();
const bodyParser = require("body-parser"); //Middleware giúp xử lý dữ liệu gửi từ client lên server (dùng để parse req.body).
const mongoose = require("mongoose"); //Thư viện giúp kết nối và làm việc với MongoDB
const cors = require("cors"); //Bật CORS (Cross-Origin Resource Sharing) để cho phép frontend và backend giao tiếp với nhau khi khác domain.

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//Middleware
app.use(bodyParser.json({ limit: "50mb" })); // Increase payload size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase payload size limit

//routes
const categoryRoutes = require("./routers/category");
const productRoutes = require("./routers/product");
const brandRoutes = require("./routers/brand"); // Import brand router

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes); // Use brand router

//database
mongoose
  .connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Kết nối MongoDB với URL:", process.env.CONNECT_STRING);
    console.log("Kết nối database đã sẵn sàng...");
    //server
    app.listen(process.env.PORT, () => {
      console.log(`server đang chạy http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
