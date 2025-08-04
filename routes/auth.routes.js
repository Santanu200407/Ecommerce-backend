const authController = require("../controllers/auth.controller")
const mw = require("../middlewares/auth.mw")

/**
 * POST localhost 8080 /ecomm/api/v1/auth/signup
 * 
 * Ineed to intercept this
 */

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[mw.vs],authController.sighnup)
    /**
     * route for post call for 
     * POST /ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin",[mw.vi],authController.sighnin)
}
