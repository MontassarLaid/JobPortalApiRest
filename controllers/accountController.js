var accountModel = require('../models/accountModel.js');

/**
 * accountController.js
 *
 * @description :: Server-side logic for managing accounts.
 */
module.exports = {

    /**
     * accountController.list()
     */
    list: function (req, res) {
        accountModel.find(function (err, accounts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting account.',
                    error: err
                });
            }
            return res.json(accounts);
        });
    },

    /**
     * accountController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        accountModel.findOne({_id: id}, function (err, account) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting account.',
                    error: err
                });
            }
            if (!account) {
                return res.status(404).json({
                    message: 'No such account'
                });
            }
            return res.json(account);
        });
    },

    /**
     * accountController.create()
     */
    create: function (req, res) {
        var account = new accountModel({
			lastname : req.body.lastname,
			firstname : req.body.firstname,
			email : req.body.email,
			password : req.body.password,
			role : req.body.role
        });

        account.save(function (err, account) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating account',
                    error: err
                });
            }
            return res.status(201).json(account);
        });
    },

    /**
     * accountController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        accountModel.findOne({_id: id}, function (err, account) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting account',
                    error: err
                });
            }
            if (!account) {
                return res.status(404).json({
                    message: 'No such account'
                });
            }

            account.lastname = req.body.lastname ? req.body.lastname : account.lastname;
			account.firstname = req.body.firstname ? req.body.firstname : account.firstname;
			account.birthday = req.body.birthday ? req.body.birthday : account.birthday;
			account.email = req.body.email ? req.body.email : account.email;
			account.password = req.body.password ? req.body.password : account.password;
			account.role = req.body.role ? req.body.role : account.role;
			
            account.save(function (err, account) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating account.',
                        error: err
                    });
                }

                return res.json(account);
            });
        });
    },

    /**
     * accountController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        accountModel.findByIdAndRemove(id, function (err, account) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the account.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    login: function (req,res) {
        var _email = req.body.email;
        var _password = req.body.password;
        accountModel.findOne({email: _email,password:_password}, function (err, account) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting account',
                    error: err
                });
            }
            if (!account) {
                return res.status(404).json({
                    message: 'No such account'
                });
            }

            return res.json(account);
        });

    }
};
