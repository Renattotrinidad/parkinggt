const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
const userController = require('./user/controllers/user.controller');

const userRouter = require('./user/routes.config');
const parkingRouter = require('./parking/routes.config');

passport.use(new Strategy(
    (token, cb) => {
        userController.getByToken(token, (err, user) => {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
userRouter.routesConfig(app);
parkingRouter.routesConfig(app);

app.use(function (req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});