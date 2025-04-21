const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DBCON = require("./Database/Db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBCON();
//files
const addProduct = require("./routes/addProduct.js");
const addCategory = require("./routes/addCategory.js");
const getParentCategories = require("./routes/getParentCategories.js");
const getCategories = require("./routes/getCategories.js");
const getProducts = require("./routes/getProducts.js");
const getProductById = require("./routes/getProductById.js");
const getProductsByIds = require("./routes/getProductsByIds.js");
const search = require("./routes/search.js");
const getRandomCategories = require("./routes/getRandomCategories.js");
//management routes
const getAdditionals = require("./routes/managementRoutes/getAdditionals.js");
const addAdditionals = require("./routes/managementRoutes/addAdditionals.js");
const checkout = require("./routes/managementRoutes/checkout.js");
const addPaymet = require("./routes/managementRoutes/addPayment.js");
const getOrders = require("./routes/managementRoutes/getOrders.js");
const getSpecificOrder = require("./routes/managementRoutes/getSpecificOrder.js");
const updateOrder = require("./routes/managementRoutes/updateOrder.js");
const updateProduct = require("./routes/managementRoutes/updateProduct.js");
const updateCategory = require("./routes/managementRoutes/updateCategory.js");
const getSpecificProduct = require("./routes/managementRoutes/getSpecificProduct.js");
const getSpecificCategory = require("./routes/managementRoutes/getSpecificCategory.js");
const getAllProducts = require("./routes/managementRoutes/getAllProducts.js");
const getPayments = require("./routes/managementRoutes/getPayments.js");
const deleteItem = require("./routes/managementRoutes/delete.js");
const login = require("./routes/managementRoutes/login.js");
const loginVerify = require("./routes/managementRoutes/loginVerify.js");
//management routes
//files
//routes
app.use("/api/addProduct", addProduct);
app.use("/api/addCategory", addCategory);
app.use("/api/getParentCategories", getParentCategories);
app.use("/api/getCategories", getCategories);
app.use("/api/getProducts", getProducts);
app.use("/api/getProductsByIds", getProductsByIds);
app.use("/api/getProductById", getProductById);
app.use("/api/getRandomCategories", getRandomCategories);
app.use("/api/search", search);
//routes
//management routes
app.use("/api/management/getAdditionals", getAdditionals);
app.use("/api/management/addAdditionals", addAdditionals);
app.use("/api/create-payment-intent", checkout);
app.use("/api/management/addPayment", addPaymet);
app.use("/api/management/getOrders", getOrders);
app.use("/api/management/updateOrder", updateOrder);
app.use("/api/management/updateProduct", updateProduct);
app.use("/api/management/updateCategory", updateCategory);
app.use("/api/management/getSpecificOrder", getSpecificOrder);
app.use("/api/management/getAllProducts", getAllProducts);
app.use("/api/management/getSpecificProduct", getSpecificProduct);
app.use("/api/management/getSpecificCategory", getSpecificCategory);
app.use("/api/management/getPayments", getPayments);
app.use("/api/management/deleteItem", deleteItem);
app.use("/api/management/login", login);
app.use("/api/management/loginVerify", loginVerify);

//management routes
app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
  console.log("Server is Running!");
});
