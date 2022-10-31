let express = require('express');
let router = express.Router();
let controller = require('../controllers/animalcontroller');
let connection = require('../config/database');

router.get('/', controller.getAllAnimals);
router.get('/:id', controller.getAnimalById);
router.post('/', controller.addAnimal);
router.put("/:id", controller.editAnimalInfo);
router.delete("/:id", controller.removeAnimal);

module.exports = router;