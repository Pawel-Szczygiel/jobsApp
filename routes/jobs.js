const express = require('express');
const router = express.Router();

const {
    getAllJobs, 
    getJob, 
    createJob, 
    updateJob, 
    deleteJob
} = require('../controllers/jobs');


router.get('/getAll', getAllJobs);
router.post('/create', createJob);

router.get('/get/:id', getJob);
router.patch('/update/:id', updateJob);
router.delete('/delete/:id', deleteJob);


module.exports = router;