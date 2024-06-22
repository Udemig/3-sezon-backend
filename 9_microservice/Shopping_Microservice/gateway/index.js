const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

// 8000.porta gelen isteklerin endpointine göre hangi api adreslerini yönlendirileceğini söylüyoruz
app.use("/customer", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002")); // products

app.listen(8000, () => {
  console.log("API Gateway 8000. portta çalışıyor");
});
