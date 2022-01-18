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
            
            UPDATE parkingLot SET parkingLotInUse = 1 WHERE parkingLotCode = ` + parking.ticketParkingLot + `;
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
            
            UPDATE parkingLot SET parkingLotInUse = 0 WHERE parkingLotCode = ` + parking.ticketParkingLot + `;
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

    async parkingAvailable(parkingLotParkingCode) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM parkingLot AS pl INNER JOIN vehicleType AS vt ON pl.parkingLotVehicleType = vt.vehicleTypeCode WHERE parkingLotParking = ` + parkingLotParkingCode + ` AND parkingLotStatus = 1 AND parkingLotDeleted = 0;`;
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

    async ticketByDate(begDate, endDate) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM ticket AS t WHERE t.ticketDate BETWEEN '` + begDate + `' AND '` + endDate + `';`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async ticketByPlate(plate) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM ticket AS t WHERE t.ticketPlate LIKE '%` + plate + `%';`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async ticketByLot(begDate, endDate) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT t.ticketParkingLot, pl.parkingLotBusinessCode, COUNT(t.ticketPlate) as quantity FROM ticket AS t INNER JOIN parkingLot AS pl ON pl.parkingLotCode = t.ticketParkingLot
            WHERE t.ticketDate BETWEEN '` + begDate + `'
            AND '` + endDate + `'
            GROUP BY t.ticketParkingLot, pl.parkingLotBusinessCode;
            `;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async lotQuantityByLot(lot) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT t.ticketParkingLot, pl.parkingLotBusinessCode, IFNULL(COUNT(t.ticketPlate),0) as quantity FROM ticket AS t RIGHT JOIN parkingLot AS pl ON pl.parkingLotCode = t.ticketParkingLot
            WHERE pl.parkingLotBusinessCode = '` + lot + `'
            GROUP BY t.ticketParkingLot, pl.parkingLotBusinessCode;
            `;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async lotQuantityByday(date) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT pl.parkingLotBusinessCode, HOUR(t.ticketDate), DATE(t.ticketDate) FROM
ticket AS t 
INNER JOIN parkingLot AS pl ON pl.parkingLotCode = t.ticketParkingLot
GROUP BY 
	pl.parkingLotBusinessCode,
	DATE(t.ticketDate),
	HOUR(t.ticketDate);
            `;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

module.exports = parking = new parking();