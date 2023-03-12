const Router = require("express")
const router = new Router()
const listChebureksRouter = require("./listChebureksRouter")


router.use("/", listChebureksRouter)



module.exports = router