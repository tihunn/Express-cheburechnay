const {Cheburek} = require("../modelsORM");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

class listChebureksController {
    async get(req, res, next) {
        const chebureks = await Cheburek.findAll()

        return res.json(chebureks)
    }



    async create(req, res, next) {
        const {
            name,
            price = 100,
        } = req.body


        if (req.files) {
            let {img} = req.files

            const fileExtension = img.name.split(".").pop()
            img.name = uuid.v4() + "." + fileExtension

            const filePath = path.resolve(__dirname, "..", "static")
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }

            await img.mv(path.resolve(__dirname, "..", "static", img.name))

            const cheburek = await Cheburek.create({
                name,
                price: Number(price),
                nameImg: img.name
            })

            return res.json(cheburek)
        }


    }



    async update(req, res, next) {
        const {id} = req.params
        const {
            name,
            price,
        } = req.body


        const cheburek = await Cheburek.findByPk(id)
        cheburek.name = name
        cheburek.price = Number(price)

        if (req.files) {
            const {img} = req.files

            const fileExtension = img.name.split(".").pop()
            img.name = uuid.v4() + "." + fileExtension

            if (cheburek.nameImg) {
                fs.unlinkSync(path.resolve(__dirname, "..", 'static', cheburek.nameImg))
            }

            await img.mv(path.resolve(__dirname, "..", "static", img.name))

            cheburek.nameImg = img.name
        }

        const newModel = await cheburek.save()

        return res.json(newModel)
    }



    async delete(req, res, next) {
        try {
            const {id} = req.params

                if (!id) { return res.json("Не отправлен Id параметром") }

                const cheburek = await Cheburek.findByPk(id)

                if (cheburek.nameImg) {
                    fs.unlinkSync(path.resolve(__dirname, "..", 'static', cheburek.nameImg))
                }

                await Cheburek.destroy({where: {id}})

            return res.json("Запрос на удаление успешно обработан")
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new listChebureksController()