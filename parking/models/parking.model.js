const config = require('../../common/config/env.config.js');
const mysql = require('mysql2/promise');
const axios = require('axios');

class parking {

    async parkingEntrance(parking) {
        const connection = await mysql.createConnection(config.options);
        try {
            await connection.beginTransaction();
            const query = `INSERT INTO ticket (
                ticketParking,
                ticketParkingLot,
                ticketPlate,
                ticketDate,
                ticketType,
                ticketStatus,
                ticketDeleted
            ) VALUES (
                '` + parking.ticketParking + `',
                '` + parking.ticketParkingLot + `',
                '` + parking.ticketPlate + `',
                NOW(),
                '` + parking.ticketType + `',
                1,
                0
            );
            
            UPDATE parkinglot SET parkingLotInUse = 1 WHERE parkingLotCode = ` + parking.ticketParkingLot + `;
            `;
            let queryResult = await connection.query(query);
            await connection.commit();
            await connection.end();
            return Promise.resolve(queryResult);
        } catch (error) {
            await connection.rollback();
            await connection.end();
            return Promise.reject(error);
        }
    }

    async parkingExit(parking) {
        const connection = await mysql.createConnection(config.options);
        try {
            await connection.beginTransaction();
            const query = `
            UPDATE ticket SET ticketPay = '1', ticketOut = NOW() WHERE ticketCode = ` + parking.ticketCode + `;
            
            UPDATE parkinglot SET parkingLotInUse = 0 WHERE parkingLotCode = ` + parking.ticketParkingLot + `;
            `;
            let queryResult = await connection.query(query);
            await connection.commit();
            await connection.end();
            return Promise.resolve(queryResult);
        } catch (error) {
            await connection.rollback();
            await connection.end();
            return Promise.reject(error);
        }
    }

    async parkingAvailable(parking) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM parkingLot WHERE parkingLotParking = ` + parking.parkingLotParkingCode + ` AND parkingLotStatus = 1 AND parkingLotDeleted = 0;`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async parkingPrices(parkingCode) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM vehicleType WHERE vehicleTypeParking = ` + parkingCode + ` AND vehicleTypeStatus = 1 AND vehicleTypeDeleted = 0;`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

module.exports = parking = new parking();