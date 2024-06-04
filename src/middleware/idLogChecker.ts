import { Request, Response, NextFunction } from "express";
import carLogService from "../service/carLogService";

const idLogChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const newId = +id;

  if (!(newId > 0)) {
    res.status(400).json({ status: "error", message: "Id not valid!" });
  } else {
    const log = await carLogService.getCarLogByCarId(newId);
    if (log.length === 0) {
      res.status(404).json({ status: "Error", message: "Data not found!" });
    } else next();
  }
};

export default idLogChecker;
