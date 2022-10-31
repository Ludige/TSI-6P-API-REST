let express = require('express');
let router = express.Router();
let controller = require('../controllers/animalcontroller');

router.get('/', controller.getAllAnimals);
router.get('/:id', controller.getAnimalById);
router.post('/', controller.addAnimal);
router.put("/:id", controller.editAnimalInfo);

module.exports = router;