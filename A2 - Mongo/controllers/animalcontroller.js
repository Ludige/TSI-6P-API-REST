let mongoose = require('mongoose');
let Animal = require('../models/animals');

module.exports = {
    addAnimal: (req,res,next) => {//vv
        let {nome,usuario,especie} = req.query;

        let newAnimal = new Animal();

        newAnimal.usuario =  usuario;
        newAnimal.nome = nome;
        newAnimal.especie = especie;

        newAnimal.save()
        .then(()=>{
            res.status(200).json({msg:"Novo animal cadastrado com sucesso"});
        })
        .catch(error => {
            console.log("Error: "+error);
        })
    },
    getAllAnimals : async(req,res,next) =>{//vv
        var animals = await Animal.find();

        if(animals != null){
            res.status(200).json(animals);
        }
        else res.status(400).json({msg:"Animal não encontrado"});    
    },
    getAnimalById : async(req,res,next) => {//vv
        let animal = await Animal.findById(req.params.id);

        if(animal != null){
            res.status(200).json(animal);
        }else{
            res.status(400).json({msg:"Animal não encontrado"});
        }
    },
    editAnimalInfo:async(req,res,next) =>{
        let novosDados = await Animal.findById(req.params.id);


        let {usuario,nome,especie} = req.query;
        //acredito que não precisava salvar em variaveis esses dados, mas estava confuso no $set então preferi passar
        novosDados.usuario = usuario;
        novosDados.nome = nome;
        novosDados.especie = especie;

        if(novosDados != null){//TODO
            await Animal.findByIdAndUpdate(req.params.id,{
                $set:{
                    usuario: novosDados.usuario,
                    nome: novosDados.nome,
                    especie: novosDados.especie
                }
            });

            res.status(200).json({msg:"Dados do animal alterados com sucesso"+novosDados});
            return;
        }else{
            if(!found) res.status(404).json({msg: "404: Animal não encontrado"});
        }
    
    },
    removeAnimal:async(req,res,next)=>{//vv
        let animal = await Animal.findById(req.params.id);

        if(animal != null){
            await Animal.findOneAndDelete({_id:req.params.id});

            res.status(200).json({msg:"Animal removido com sucesso"});
            return;
        }else{
            res.status(404).json({msg: "404: Animal não encontrado"});
        }
    }
}