let animals = [
    {id: 1, name: 'Jonas', race:'Pastor Alemão'},
    {id: 2, name: 'Bruno', race:'Golden Retriever'},
    {id: 3, name: 'Felipe', race:'Husky'},
]

module.exports = {
    addAnimal: (req,res,next) => {
        //Nome e Raça pelo body | TODO > Verificações
        let newAnimal = req.body;
        //Posição do ultimo +1
        newAnimal.id = animals[animals.length - 1].id + 1;

        animals.push(newAnimal);

        res.status(200).json({msg:"Novo animal cadastrado com sucesso"});
    },
    getAllAnimals : (req,res,next) =>{
        res.status(200).json(animals);
    },
    getAnimalById : (req,res,next) => {
        let animalId = req.params.id;
        let allAnimals = animals;
        
        let gotAnimal = new Array;
        
        for (let i = 0; i < allAnimals.length; i++){
            if(allAnimals[i].id == animalId) gotAnimal.push(allAnimals[i]);
        }

        if(gotAnimal.length > 0){
            res.status(200).json(gotAnimal[0]);
        }else{
            res.status(400).json({msg:"Não encontrei, seu animal, puts errei a virgula"});
        }
    },
    editAnimalInfo:(req,res,next) =>{
        let animalId = req.params.id; //id do link
        let animalData = req.body; //novas informações
        let found = false;

        animals.forEach((animal, position) =>{
            if(animal.id == animalId){
                found = true;
                animals[position].name = animalData.name;
                animals[position].race = animalData.race;

                res.status(200).json({msg:"Dados do animal alterados com sucesso"});

                return;
            }
        });

        if(!found) res.status(404).json({msg: "404: Animal não encontrado"});
    },
    removeAnimal:(req,res,next)=>{
        let animalId = req.params.id;
        let found = false;

        animals.forEach((animal, position) =>{
            if(animal.id == animalId){
                found = true;
                animals.splice(position,1);//deleteCount: limita a quantidade de items removidos apartir da posição passada
                res.status(200).json({msg:"Animal removido com sucesso"});
                
                return;
            }
        });

        if(!found) res.status(404).json({msg: "404: Animal não encontrado"});
    }
}