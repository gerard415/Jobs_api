const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { findOne } = require('../models/Job')

const getAlljobs = async (req, res)=>{
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res)=>{
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOne({_id:jobId, createdBy:userId})
    if(!job){
        throw new NotFoundError(`There is no job with an id of ${jobId}`)
    }res.status(StatusCodes.OK).json({ job })
    

}

const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId //connecting the Job to a user 
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job }) 
}

const updateJob = async (req, res)=>{
    res.send('update job')
}

const deleteJob = async (req, res)=>{
    res.send('delete job')
}

module.exports = {getAlljobs, getJob, createJob, updateJob, deleteJob}