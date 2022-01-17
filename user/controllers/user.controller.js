const userModel = require('../models/user.model');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

exports.insert = async (req, res) => {
    try {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(req.body.userPassword).digest("base64");
        req.body.userPassword = salt + "$" + hash;
        const uuid = uuidv4();
        req.body['userToken'] = uuid;
        const userResponse = await userModel.userInsert(req.body);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: [],
            userCode: userResponse[0].insertId
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.getAll = async (req, res) => {
    try {
        const userResponse = await userModel.userGetAll();
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: userResponse
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.getByCode = async (req, res) => {
    try {
        const userResponse = await userModel.userGetOne(req.params.userCode);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: userResponse,
        }));
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.update = async (req, res) => {
    try {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.createHmac('sha512', salt).update(req.body.userPassword).digest("base64");
        req.body.userPassword = salt + "$" + hash;
        const userResponse = await userModel.userUpdate(req.body);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: []
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.getByToken = async (userToken, res) => {
    try {
        const userResponse = await userModel.userGetToken(userToken);
        return res(null, userResponse);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getToken = async (req, res) => {
    try {
        const userResponse = await userModel.userLogin(req.body);
        const passwordFields = userResponse[0].userPassword.split('$');
        const salt = passwordFields[0];
        const hash = crypto.createHmac('sha512', salt).update(req.body.userPassword).digest("base64");
        if (hash === passwordFields[1]) {
            userResponse[0].userPassword = undefined;
            return Promise.resolve(res.status(200).send({
                statusCode: 200,
                result: true,
                message: 'Operación exitosa',
                records: userResponse
            }));
        } else {
            return Promise.resolve(res.status(200).send({
                statusCode: 200,
                result: false,
                message: 'Invalid e-mail or password',
                records: []
            }));
        }

    } catch (error) {
        return Promise.reject(error);
    }
};