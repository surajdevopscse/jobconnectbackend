const { trusted } = require('mongoose');
const Job = require('../models/job');

module.exports ={


//Create a new Job
createJob:async(req,res)=>{
    const newsJob = new Job(req.body);
    try{
        await newsJob.save();
        res.status(200).json({status:true,mesaage:'Job saved successfully'});
    }catch(err){
        res.status(500).json(err);
    }
},


//Update a Job by its ID
updateJob:async(req,res)=>{
    const jobId =req.params.id;
    const updated =  req.body;
    try{
        const updatedJob = await Job.findByIdAndUpdate(jobId,updated,{new:true});
        if(!updatedJob){
            return res.status(404).json({status:false,message:'Job not found'});
        }
        res.status(200).json({status:true,mesaage:'Job Updated successfully'});
    }catch(err){
        res.status(500).json(err);
    }
},


//Delete job by its Id
deleteJob:async(req,res)=>{
    const jobId =req.params.id;
    try{
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if(!deletedJob){
            return res.status(404).json({status:false,message:'Job not found'});
        }
        res.status(200).json({status:true,mesaage:'Job Deleted successfully'});
    }catch(err){
        res.status(500).json(err);
    }
},


//Get Job By Its ID
getJob:async(req,res)=>{
    const jobId =req.params.id;
    try{
        const job = await Job.findById({_id:jobId},{createdAt:0,updatedAt:0,__V:0});
        return res.status(200).json(job);
    }catch(err){
        res.status(500).json(err);
    }
},



//Get all jobs
getAllJobs:async(req,res)=>{
    const recent =req.query.new;
    try{
       let jobs;
       if(recent){
        jobs = await Job.find({},{createdAt:0,updatedAt:0,__V:0}).sort({createdAt:-1}).limit(2);
       }else{
        jobs = await Job.find({},{createdAt:0,updatedAt:0,__V:0});
       }
        return res.status(200).json(jobs);
    }catch(err){
        res.status(500).json(err);
    }
},




//Search Job Using Any Keyword
searchJob:async(req,res)=>{
    try{
        const results = await Job.aggregate([
            {
              $search: {
                index: "jobsearch",
                text: {
                  query: req.params.key,
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
          ])
        res.status(200).json(results);
    }catch(err){
        res.status(500).json(err);
    }
},




};