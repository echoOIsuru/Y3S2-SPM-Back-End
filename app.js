const express = require('express');
const connectDB = require('./database/connection');
var router = express.Router();
const cors = require("cors");
const bodyparser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

//port configuration
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//connect mongoDB
connectDB();

//parse data to body
app.use(bodyparser.json())

//middlewares
app.use(express.json());

//cross origin
app.use(cors());

//assign routers
app.use("/api/v1", router);
router.use(require('./routes/router.js'))
router.use(require('./routes/doctorManagementRoutes.js'))

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/api/v1`);
})

module.exports = app