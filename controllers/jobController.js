var jobModel = require('../models/jobModel.js');

/**
 * jobController.js
 *
 * @description :: Server-side logic for managing jobs.
 */
module.exports = {

    /**
     * jobController.list()
     */
    list: function (req, res) {
        jobModel.find(function (err, jobs) {
            console.log('list jbs');
            console.log(jobs);
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting job.',
                    error: err
                });
            }
            return res.json(jobs);
        });
    },

    /**
     * jobController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        jobModel.findOne({id: id}, function (err, job) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting job.',
                    error: err
                });
            }
            if (!job) {
                return res.status(404).json({
                    message: 'No such job'
                });
            }
            return res.json(job);
        });
    },

    /**
     * jobController.create()
     */
    create: function (req, res) {
        jobModel.count({}, function(err, count){
            var _ = require('underscore');
            var today = new Date();
            var job = new jobModel(_.extend(req.body, {'id':count+1,'date_publication': today}));
            job.save(function (err, job) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating job',
                            error: err
                        });
                    }
                    return res.status(201).json(job);
                });
        });
        
    },

    /**
     * jobController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        jobModel.findOne({id: id}, function (err, job) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting job',
                    error: err
                });
            }
            if (!job) {
                return res.status(404).json({
                    message: 'No such job'
                });
            }

            job.title = req.body.title ? req.body.title : job.title;
            job.date_publication = req.body.date_publication ? req.body.date_publication : job.date_publication;
            job.description = req.body.description ? req.body.description : job.description;
            job.experience = req.body.experience ? req.body.experience : job.experience;
            job.type_job = req.body.type_job ? req.body.type_job : job.type_job;
            job.contrat = req.body.contrat ? req.body.contrat : job.contrat;
            job.salary = req.body.salary ? req.body.salary : job.salary;

            job.save(function (err, job) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating job.',
                        error: err
                    });
                }

                return res.json(job);
            });
        });
    },

    /**
     * jobController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        jobModel.findOneAndRemove({id: id}, function (err, job) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the job.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * jobController.search()
     */
    search: function (req, res) {

        var keyword = req.params.keyword;
        var location = req.params.location;
        var job_category = req.params.job_category;

        if (keyword == 'null' && location == 'null'&& job_category == 'null')
        {
            return res.json({});
        }
        else if (keyword == 'null' && location == 'null' && job_category != 'null')
        {
            var options = {'category.name': job_category};
        }
        else if (keyword == 'null' && location != 'null' && job_category == 'null')
        {
            var options = {location: location};
        }
        else if (keyword == 'null' && location != 'null' && job_category != 'null')
        {
            var options = {location: location, 'category.name': job_category};
        }
        else if (keyword != 'null' && location == 'null' && job_category == 'null')
        {
            var options = {$text: {$search: keyword}};
        }
        else if (keyword != 'null' && location == 'null' && job_category != 'null')
        {
            var options = {$text: {$search: keyword}, 'category.name': job_category};
        }
        else if (keyword == 'null' && location != 'null' && job_category == 'null')
        {
            var options = {location: location, $text: {$search: keyword}};
        }
        else if (keyword != 'null' && location !='null' && job_category != 'null')
        {
            var options = {$text: {$search: keyword}, location: location, 'category.name': job_category};
        }

        jobModel.find(options, function (err, jobs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting job',
                    error: err
                });
            }
            return res.json(jobs);
        });
    },



}
;
