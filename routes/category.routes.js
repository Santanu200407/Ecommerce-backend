const category_controller= require("../controllers/category.controller");
const mw = require("../middlewares/auth.mw")
/**
 * POST localhost:8080/ecomm/api/v1/categories
 */

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[mw.vt,mw.va],category_controller.createNewCategory)
}