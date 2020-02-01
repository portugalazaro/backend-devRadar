const axios = require("axios");
const Dev = require("../models/Dev");
const ParseStringAsArray = require('./../utils/ParseStringAsArray');

module.exports = {

    async index(req,res) {
        const devs = await Dev.find();
        return res.json(devs)
    },

    async store(req,res){

        const {user_name, techs, latitude, longitude} = req.body 

        let dev = await Dev.findOne({github_username: user_name.toLowerCase().trim()});
        
        if(!dev) {
            
            const {data, message}  = await axios.get(`https://api.github.com/users/${user_name}`)
            
            if(message) return res.json({erro: "usuario invalido"});

            const {name = login, bio, avatar_url } = data
            const arrayTechs = ParseStringAsArray(techs);
        
            let location = {
                type: "Point",
                coordinates: [latitude, longitude]
            }
        
            dev = await Dev.create({
                name,
                github_username: data.login.toLowerCase(),
                avatar_url,
                bio,
                techs: arrayTechs,
                location
            })
            
            return res.status(201).json(dev)
        } 

        return res.json({erro: "usuario ja existe"})

        // return res.json({name, bio, avatar_url, arrayTechs})
    },

    async update(req,res ){
        const {_id, techs}  = req.body;
        let dev = await Dev.findOne({_id});

        if(!dev){
            return res.json({dev: "Usuario nao existe na base de dados"});
        }

        dev  = await Dev.findByIdAndUpdate({_id},{
            techs: ParseStringAsArray(techs)
        }, {new: true});

        return res.json(dev)
    },


    async destroy(req,res){
        const dev  = req.params.github_username;
        const devDeleted = await Dev.deleteOne({github_username: dev });
        return res.json({ok: devDeleted.deletedCount})
    },

    async dev(req,res){
        let dev = await  Dev.findOne({github_username: req.params.github_username})

        if(!dev){
            return res.json({erro: "usuario nao existe!"})
        }
        res.json(dev)
    },


    async onlyPart(req,res){

        const {_id, techs}  = req.body;
        let dev = await Dev.findOne({_id});

        if(!dev){
            return res.json({dev: "Usuario nao existe na base de dados"});
        }

        dev  = await Dev.findByIdAndUpdate({_id},{
            techs: ParseStringAsArray(techs)
        }, {new: true});

        return res.json(dev)
    }

}