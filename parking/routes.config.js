const parkingController = require('./controllers/parking.controller');
const passport = require('passport');

exports.routesConfig = async (app) => {
    app.post('/parking/entrance', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.entrance(req, res);
        }
    ]);

    app.post('/parking/exit', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.exit(req, res);
        }
    ]);

    app.get('/parking/available/:parkingLotParkingCode', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.available(req, res);
        }
    ]);
    app.get('/parking/prices/:parkingCode', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.prices(req, res);
        }
    ]);

    app.get('/parking/ticket/:begDate/:endDate', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.ticketByDate(req, res);
        }
    ]);
    app.get('/parking/ticket/:plate', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.ticketByPlate(req, res);
        }
    ]);
    app.get('/parking/ticket/lot/:begDate/:endDate', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.ticketByLot(req, res);
        }
    ]);

    app.get('/parking/lot/:lot', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.lotQuantityByLot(req, res);
        }
    ]);

    app.get('/parking/hour/:date', [
        passport.authenticate('bearer', {
            session: false
        }),
        async (req, res) => {
            return res = await parkingController.lotQuantityByday(req, res);
        }
    ]);
};