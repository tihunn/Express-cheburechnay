const Router = require("express")
const router = new Router()
const listChebureksController = require("../controller/listChebureksController")



router.get("/", listChebureksController.get)
router.post("/", listChebureksController.create)
router.put("/:id", listChebureksController.update)
router.delete("/:id", listChebureksController.delete)


module.exports = router