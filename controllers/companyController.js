var companyModel = require('../models/companyModel.js');

/**
 * companyController.js
 *
 * @description :: Server-side logic for managing companys.
 */
module.exports = {

    /**
     * companyController.list()
     */
    list: function (req, res) {
        companyModel.find(function (err, companys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company.',
                    error: err
                });
            }
            return res.json(companys);
        });
    },

    /**
     * companyController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        companyModel.findOne({id: id}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company.',
                    error: err
                });
            }
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }
            return res.json(company);
        });
    },

    /**
     * companyController.create()
     */
    create: function (req, res) {
        companyModel(req.body).save();
        return res.status(201).json(req.body);
    },

    /**
     * companyController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        companyModel.findOne({id: id}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting company',
                    error: err
                });
            }
            if (!company) {
                return res.status(404).json({
                    message: 'No such company'
                });
            }

            company.name = req.body.name ? req.body.name : company.name;
			company.location = req.body.location ? req.body.location : company.location;
			
            company.save(function (err, company) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating company.',
                        error: err
                    });
                }

                return res.json(company);
            });
        });
    },

    /**
     * companyController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        companyModel.findOneAndRemove({id:id}, function (err, company) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the company.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
