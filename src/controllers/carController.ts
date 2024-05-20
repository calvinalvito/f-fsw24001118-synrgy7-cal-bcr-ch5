import { Request, Response } from 'express';
import { CarsModel } from '../models/Cars';
import db from '../db/db';
import { mUpload } from "../config/multer";
import cloudinary from "../config/cloudinary";


//Mengambil Seluruh Data
export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await CarsModel.query(db);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//Get Data dengan Id
export const getCarById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await CarsModel.query(db).findById(id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        return res.json(car);
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await CarsModel.query(db).deleteById(id);

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }

        return res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//Create Data Car
export const createCar = async (req: Request, res: Response) => {
    try {
      mUpload.single('picture')(req, res, async (err: any) => {
        if (err) {
          console.error('Error uploading picture:', err);
          return res.status(400).json({ message: 'Error uploading picture', error: err });
        }
        try {
          const fileBase64 = req.file?.buffer.toString('base64');
          const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
  
          const result = await cloudinary.uploader.upload(file, {
            folder: 'bcr',
            use_filename: true,
          });
          const { name, price, start_rent, finish_rent } = req.body;
          const car = await CarsModel.query(db).insert({
            name,
            price,
            picture: result.url,
            start_rent,
            finish_rent,
          }).returning("*");
          res.status(201).json({
            message: "Car created successfully",
            car,
          });
        } catch (error) {
          console.error('Error uploading picture to Cloudinary:', error);
          res.status(400).json({
            message: "Error uploading picture to Cloudinary",
            error,
          });
        }
      });
    } catch (error) {
      console.error('Error creating car:', error);
      res.status(400).json({
        message: "Error creating car",
        error,
      });
    }
};

//Update Data Car
export const updateCar = async (req: Request, res: Response) => {
    try {
      mUpload.single('picture')(req, res, async (err: any) => {
        if (err) {
          console.error('Error uploading picture:', err);
          return res.status(400).json({ message: 'Error uploading picture', error: err });
        }
        try {
          const fileBase64 = req.file?.buffer.toString('base64');
          const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
  
          const result = await cloudinary.uploader.upload(file, {
            folder: 'bcr',
            use_filename: true,
          });
  
          const { name, price, start_rent, finish_rent} = req.body;
          const getId: number = Number(req.params.id);
          
          const existingCar = await CarsModel.query(db).findById(getId);
          if (!existingCar) {
            return res.status(404).json({ message: "Car not found" });
          }
  
          const updatedCar = await CarsModel.query(db).findById(getId).patch({
            name,
            price,
            picture: result.url,
            start_rent,
            finish_rent
          }).returning("*");
  
          res.status(200).json({
            message: "Car updated successfully",
            car: updatedCar,
          });
        } catch (error) {
          console.error('Error uploading picture to Cloudinary:', error);
          res.status(400).json({
            message: "Error uploading picture to Cloudinary",
            error,
          });
        }
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(400).json({
        message: "Error updating car",
        error,
      });
    }
  };
  
  
  
  


