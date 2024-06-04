import { Request, Response, NextFunction } from "express";
import carServices from "../service/carServices";

const idChecker = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const newId = +id;

  if (!(newId > 0)) {
    res.status(400).json({ status: "error", message: "Id not valid!" });
  } else {
    const car = await carServices.getCarById(newId);
    if (car.length === 0) {
      res.status(404).json({ status: "Error", message: "Data not found!" });
    } else next();
  }
};

export default idChecker;
