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

exports.ticketByDate = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.ticketByDate(req.params.begDate, req.params.endDate);
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

exports.ticketByPlate = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.ticketByPlate(req.params.plate);
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

exports.ticketByLot = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.ticketByLot(req.params.begDate, req.params.endDate);
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

exports.lotQuantityByLot = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.lotQuantityByLot(req.params.lot);
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

exports.lotQuantityByday = async (req, res) => {
    try {
        const parkingResponse = await parkingModel.lotQuantityByday(req.params.date);
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

        }));
    } catch (error) {
        return Promise.reject(error);
    }

};