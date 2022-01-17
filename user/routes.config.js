const usersController = require('./controllers/user.controller');
const passport = require('passport');

exports.routesConfig = async (app) => {
    app.post('/user', [
        passport.authenticate('bearer', { session: false }),
        async (req, res) => {
            return res = await usersController.insert(req, res);
        }
    ]);
    app.get('/user', [
        passport.authenticate('bearer', { session: false }),
        async (req, res) => {
            return res = await usersController.getAll(req, res);
        }
    ]);
    app.get('/user/:userCode', [
        passport.authenticate('bearer', { session: false }),
        async (req, res) => {
            return res = await usersController.getByCode(req, res);
        }
    ]);
    app.put('/user', [
        passport.authenticate('bearer', { session: false }),
        async (req, res) => {
            return res = await usersController.update(req, res);
        }
    ]);
    app.post('/auth', [
        // passport.authenticate('bearer', { session: false }),
        async (req, res) => {
            return res = await usersController.getToken(req, res);
        }
    ]);
};
