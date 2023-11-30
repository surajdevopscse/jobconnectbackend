const { trusted } = require('mongoose');
const Job = require('../models/job');

module.exports ={
createJob:async(req,res)=>{
    const newsJob = new Job(req.body);
    try{
        await newsJob.save();
        res.status(200).json({status:true,mesaage:'Job saved successfully'});
    }catch(err){
        res.status(500).json(err);
    }
},

updateJob:async(req,res)=>{
    const jobId =req.param.id;
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
deleteJob:async(req,res)=>{
    const jobId =req.param.id;
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
getJob:async(req,res)=>{
    const jobId =req.param.id;
    try{
        const job = await Job.findById({_id:jobId},{createdAt:0,updatedAt:0,__V:0});
        return res.status(200).json(job);
    }catch(err){
        res.status(500).json(err);
    }
}

};