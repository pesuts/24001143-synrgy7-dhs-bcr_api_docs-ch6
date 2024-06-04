import { CarLog } from "./../models/carLog.model ";
import carLogRepository from "../repository/carLogRepository";

export default {
  async addCarLog(args: CarLog) {
    return await carLogRepository.addCarLog(args);
  },
  async getCarLogByCarId(id: CarLog["car_id"]) {
    return await carLogRepository.getCarLogByCarId(id);
  },
  async getDetailCarLogByCarId(id: CarLog["car_id"]) {
    return await carLogRepository.getDetailCarLogByCarId(id);
  },
  async updateCarLogByCarId(id: CarLog["car_id"], args: CarLog) {
    await carLogRepository.updateCarLogByCarId(id, args);
    return;
  },
};
