const authController = require("../controllers/auth.controller")

/**
 * POST localhost 8080 /ecomm/api/v1/auth/signup
 * 
 * Ineed to intercept this
 */

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",authController.sighnup)
}
