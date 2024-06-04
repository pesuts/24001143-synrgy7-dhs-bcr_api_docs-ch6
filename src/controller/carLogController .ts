import { Request, Response } from "express";

import CarLogServices from "../service/carLogService";

export const getCarLogByCarId = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const [log] = await CarLogServices.getDetailCarLogByCarId(+carId);

    function filterLog(obj: any) {
      const filteredObject = { ...obj };

      filteredObject.created_by === null
        ? delete filteredObject.createdBy
        : delete filteredObject.created_by;
      filteredObject.updated_by === null
        ? delete filteredObject.updatedBy
        : delete filteredObject.updated_by;
      filteredObject.deleted_by === null
        ? delete filteredObject.deletedBy
        : delete filteredObject.deleted_by;

      return filteredObject;
    }

    const filteredLog = filterLog(log);

    res.status(200).json({ status: "Success", data: filteredLog });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};
