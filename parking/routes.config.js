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

    app.post('/parking/available', [
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
};