import { CarsModel } from "../models/car.model";
import { Request, Response } from "express";

export const updateCarById = async (req: Request, res: Response) => {
  const url = `/uploads/${req.file?.filename}`;

  const id = req.params.id;
  const { model, manufacture, plate, price, category } = req.body;

  await CarsModel.query().where("id", id).update({
    model,
    manufacture,
    plate,
    image_url: url,
    price,
    category,
    updated_at: new Date(),
  });

  const car = await CarsModel.query().where("id", id);

  res
    .status(200)
    .json({ status: "Success", message: "Data sucesfully updated", data: car });
};
