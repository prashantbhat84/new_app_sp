const express = require('express');
const aggregator = require("../controllers/aggregator");
const aggregatorRouter = express.Router();

const { protect, authorize } = require('../middleware/dashboardAuth')

aggregatorRouter.post("/updateAggregator", aggregator.updateAggregator);
aggregatorRouter.put("/updateAggregatorAndBox", aggregator.updateAggregatorAndBox);
aggregatorRouter.post("/createAggregator", protect, authorize(["FACTORY-ADMIN","BOOKING-ADMIN"]), aggregator.createAggregator);
aggregatorRouter.put("/updateStaleData",aggregator.updateStaleAggregatorAndBox)
module.exports = aggregatorRouter;


