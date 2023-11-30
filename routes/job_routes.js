const routes = require('express').Router();
const joobController = require('../controllers/job_controller');


routes.post("/",joobController.createJob);


routes.get("/",joobController.getAllJobs);


routes.put("/:id",joobController.updateJob);


routes.delete("/:id",joobController.deleteJob);


routes.get("/:id",joobController.getJob);


routes.get("/search/:key",joobController.searchJob);


module.exports = routes;

