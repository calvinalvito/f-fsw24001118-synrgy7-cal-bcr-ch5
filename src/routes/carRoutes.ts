import { Router } from 'express';
import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} from '../controllers/carController';

const router = Router();

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;
