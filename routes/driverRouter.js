let express = require('express');
let driverController = require('../controllers/driverControllers');

function routes(){
    
    const driverRouter = express.Router();

    driverRouter.route('/getDriver')
    .get(driverController.getDriverByName)
    .post(driverController.postDriver);

    driverRouter.use('/getDriver/:driverid', driverController.middleWare);

    driverRouter.route('/getDriver/:driverid')
    .get(driverController.getDriverByID)
    .put(driverController.putDriver);   

    return driverRouter;
}

module.exports = routes;