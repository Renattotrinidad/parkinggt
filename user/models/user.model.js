const config = require('../../common/config/env.config.js');
const mysql = require('mysql2/promise');

class User {
    constructor(userName, userLastName, userEmail, userPassword, userStatus) {
        this.userName = userName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userStatus = userStatus;
    }

    async userInsert(user) {
        const connection = await mysql.createConnection(config.options);
        try {
            await connection.beginTransaction();
            const query = `INSERT INTO user (
                userName,
                userLastName,
                userEmail,
                userPassword,
                userToken,
                userStatus
            ) VALUES (
                '` + user.userName + `',
                '` + user.userLastName + `',
                '` + user.userEmail + `',
                '` + user.userPassword + `',
                '` + user.userToken + `',
                ` + user.userStatus + `
            )`;
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

    async userGetOne(userCode) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT userCode, userName, userLastName, userEmail, userStatus  FROM user WHERE userCode = ` + userCode + `;`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0][0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async userGetToken(userToken) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT userCode, userName, userLastName, userEmail, userStatus  FROM user WHERE userToken = '` + userToken + `';`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0][0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async userGetAll() {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT userCode, userName, userLastName, userEmail, userStatus  FROM user;`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async userUpdate(user) {
        const connection = await mysql.createConnection(config.options);
        try {
            await connection.beginTransaction();
            let query;
            let updateSet = "";
            Object.keys(user).forEach((item, index, arr) => {
                if (item !== 'userCode') {
                    updateSet = updateSet + item + ` = '` + user[item] + `', `
                }
            });
            if (updateSet.endsWith(", ")) {
                updateSet = updateSet.slice(0, -2);
            }
            query = `UPDATE user SET ` + updateSet + ` WHERE userCode = ` + user.userCode + ';';
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

    async userLogin(user) {
        const connection = await mysql.createConnection(config.options);
        try {
            const query = `SELECT * FROM user WHERE userEmail = '` + user.userEmail + `';`;
            let queryResult = await connection.query(query);
            return Promise.resolve(queryResult[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

module.exports = User = new User();
