const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError } = require('../errors');


const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdBy');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}

const getJob = async (req,res) => {

}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = (req,res) => {
    res.send('update job');
}

const deleteJob = (req,res) => {
    res.send('dekete job');
} 


module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}
