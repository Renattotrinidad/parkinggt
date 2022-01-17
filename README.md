## Before using

- Please make sure that you have:
 - Node.js installed
 - Mysql installed
 - Run `npm install` or `yarn` in your root project folder
 - Create database in mysql server, using "database\parkinggt.sql".
 - Change database configurations, to access mysq, in file "common\config\env.config.js".
 

## Usage

To run the project, please use a command line the following:
 - `npm start`
    - It will run the server at port 3600.
To start first user signup use 
 - `curl -v -H "Authorization: Bearer 081eff57-945e-4b8e-a4ba-ab97545b23f2" http://127.0.0.1:3600/`
