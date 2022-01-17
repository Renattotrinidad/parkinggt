const parkingModel = require('../models/parking.model');

exports.available = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.parkingAvailable(req.params.parkingLotParkingCode);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: parkingResponse
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.prices = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.parkingPrices(req.params.parkingCode);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: parkingResponse
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.entrance = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.parkingEntrance(req.body);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: [],
            parkingCode: parkingResponse[0].insertId
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};

exports.exit = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.parkingExit(req.body);
        return Promise.resolve(res.status(200).send({
            statusCode: 200,
            result: true,
            message: 'Operación exitosa',
            records: parkingResponse
        }));
    } catch (error) {
        return Promise.reject(error);
    }

};