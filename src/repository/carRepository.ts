import { CarsModel, Cars } from "../models/car.model";

export default {
  async getAllCars() {
    const cars = await CarsModel.query().withGraphFetched(
      "[car_logs.[createdBy, updatedBy, deletedBy]]"
    );
    return cars;
  },
  async getAvailableCars() {
    const cars = await CarsModel.query()
      .where("available", true)
      .withGraphFetched("[car_logs.[createdBy, updatedBy, deletedBy]]");
    return cars;
  },

  async getCarById(id: string | number) {
    const cars = await CarsModel.query()
      .where("id", id)
      .withGraphFetched("car_logs");
    return cars;
  },

  async addCar(args: Cars) {
    return await CarsModel.query().insert(args);
  },

  async updateCarById(id: string | number, args: Cars) {
    await CarsModel.query().where("id", id).update(args);
  },

  async deleteCarById(id: string | number) {
    await CarsModel.query().deleteById(id);
  },
};
