import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import CarServices from "../service/carServices";
import CarLogServices from "../service/carLogService";

interface Car {
  model: string;
  manufacture: string;
  plate: string;
  price: number;
  category: string;
  created_at?: Date;
  updated_at: Date;
  available?: boolean;
  image_url?: string;
}

// interface updateCar {
//   model?: string;
//   manufacture?: string;
//   plate?: string;
//   price?: number;
//   category?: string;
//   created_at?: Date;
//   updated_at?: Date;
//   available?: boolean;
//   image_url?: string;
// }

export const getAllCars = async (_: any, res: Response) => {
  try {
    const cars = await CarServices.getAllCars();
    res.status(200).json({ status: "Success", data: cars });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

export const getAvailableCars = async (_: any, res: Response) => {
  try {
    const cars = await CarServices.getAvailableCars();

    res.status(200).json({ status: "Success", data: cars });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const car = await CarServices.getCarById(carId);

    res.status(200).json({ status: "Success", data: car });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

export const addCar = async (req: any, res: Response) => {
  try {
    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .send({ status: "Error", message: "File must be a picture!" });
    // }
    // let newCar = {};


    const { model, manufacture, plate, price, category } = req.body;
    const { id } = req.body.user;

    const newCar: Car = {
      model,
      manufacture,
      plate,
      // image_url: url,
      price,
      category,
      created_at: new Date(),
      updated_at: new Date(),
      available: true
    };

    if (req.file) {
      const url = `/uploads/${req.file!.filename}`;
      newCar.image_url = url;
      // newCar = {...newCar, image_url: url};
    }
    // console.log(req.body.user);

    // const newCar = {
    //   model,
    //   manufacture,
    //   plate,
    //   image_url: url,
    //   price,
    //   category,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    //   available: true
    // };

    const car = await CarServices.addCar(newCar);
    const carId = car.id as number;
    await CarLogServices.addCarLog({ car_id: carId, created_by: id });
    res
      .status(201)
      .json({ status: "Success", message: "Data sucesfully added", data: car });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

export const updateCarById = async (req: Request, res: Response) => {
  try {
    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .send({ status: "Error", message: "File must be a picture!" });
    // }

    const carId = req.params.id;
    const { id } = req.body.user;

    const PUBLIC_DIR = path.join(__dirname, "../public");

    const oldCars = await CarServices.getCarById(carId);
    const oldCar = oldCars[0];
    
    if (oldCar.image_url) { 
      const oldImageUrl = path.join(PUBLIC_DIR, oldCar.image_url);
      fs.unlink(oldImageUrl, () => {});
    }

    const { model, manufacture, plate, price, category, created_by } = req.body;

    const updatedCar: Car = {
      model,
      manufacture,
      plate,
      // image_url: url,
      price,
      category,
      updated_at: new Date(),
    };

    if (req.file) { 
      const url = `/uploads/${req.file!.filename}`;
      updatedCar.image_url = url;
    }

    await CarServices.updateCarById(carId, updatedCar);

    const [log] = await CarLogServices.getCarLogByCarId(+carId);
    const newLog = {
      car_id: log.car_id,
      created_by: log.created_by,
      updated_by: id,
    };
    await CarLogServices.updateCarLogByCarId(log.car_id, newLog);

    const car = await CarServices.getCarById(carId);

    res.status(200).json({
      status: "Success",
      message: "Data sucesfully updated",
      data: car,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

export const deleteCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const { id } = req.body.user;

    await CarServices.deleteCarById(carId);
    const [log] = await CarLogServices.getCarLogByCarId(+carId);
    const newLog = {
      car_id: log.car_id,
      created_by: log.created_by,
      deleted_by: id,
    };
    await CarLogServices.updateCarLogByCarId(log.car_id, newLog);

    res
      .status(200)
      .json({ status: "Success", message: "Data sucesfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};
