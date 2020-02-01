const Dev = require("../models/Dev");
const ParseStringAsArray = require("../../src/utils/ParseStringAsArray")


module.exports = {
    async index(req,res){
    // Buscar todos os devs num raio de 10km.
    // filtrar por tecnologias.

    const { latitude, longitude, techs } = req.query;

    const arrayTechs = ParseStringAsArray(techs)

    const dev = await Dev.find({
        techs: {
            $in: arrayTechs
        }, 
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                },
                $maxDistance: 10000
            }
        }
    })

    return res.json(dev)
    }
}