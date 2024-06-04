import { CarLogModel, CarLog } from "./../models/carLog.model ";

export default {
  async addCarLog(args: CarLog) {
    return await CarLogModel.query().insert(args);
  },
  async getCarLogByCarId(id: CarLog["car_id"]) {
    return await CarLogModel.query().where("car_id", id!);
  },
  async getDetailCarLogByCarId(id: CarLog["car_id"]) {
    return await CarLogModel.query()
      .where("car_id", id)
      .withGraphFetched("[createdBy, updatedBy, deletedBy]");
  },
  async updateCarLogByCarId(id: CarLog["car_id"], args: CarLog) {
    await CarLogModel.query().where("car_id", id!).update(args);
    return;
  },
};
