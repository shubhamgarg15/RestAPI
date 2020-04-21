let db = require('../db/db');

exports.getDriverByName = function (req, res) {
    query = 'SELECT * FROM Driver'
    filter = req.query.drivername;
    if (req.query.drivername) {
        query = 'SELECT * FROM Driver where DriverName = \'' + filter + '\'';
    }

    db.executeQuery(query, function (data, err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data.recordset);
        }
    });
}

exports.postDriver = function (req, res) {
    console.log(req.body);
    if (req.body.DriverName &&
        req.body.PhoneNumber &&
        req.body.City) {
        const driverName = req.body.DriverName;
        const phoneNumber = req.body.PhoneNumber;
        const city = req.body.City;
        query = 'INSERT INTO Driver (DriverName, PhoneNumber, City) VALUES (\'' + driverName + '\',\'' + phoneNumber + '\',\'' + city + '\')';
        db.executeQuery(query, function (data, err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Data inserted');
            }
        });
    }
    res.status(201).json(req.body);
}

exports.middleWare = function (req, res, next) {
    query = 'SELECT * FROM Driver'
    filter = req.params.driverid;
    if (!isNaN(filter)) {
        query = 'SELECT * FROM Driver where DriverID = ' + filter;
    }
    db.executeQuery(query, function (data, err) {
        if (err) {
            console.log(err);
        }
        if (data.recordset[0]) {
            req.data = data.recordset;
            return next();
        }
        return res.send('Data not found');
    });
}

exports.getDriverByID = function (req, res) {
    res.send(req.data);
}

exports.putDriver = function (req, res) {
    var driverID = req.params.driverid;
    const driverName = req.body.DriverName;
    const phoneNumber = req.body.PhoneNumber;
    const city = req.body.City;
    query = 'UPDATE Driver SET DriverName = \'' + driverName + '\',PhoneNumber = \'' +
        phoneNumber + '\',City = \'' + city + '\''
        + 'WHERE DriverID = \'' + driverID + '\'';

    db.executeQuery(query, function (data, err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send('Record updated');
        }
    });
}
