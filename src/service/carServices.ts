import { Cars } from "../models/car.model";
import CarRepository from "../repository/carRepository";

export default {
  async getAllCars() {
    const cars = CarRepository.getAllCars();
    return cars;
  },
  async getAvailableCars() {
    const cars = CarRepository.getAvailableCars();
    return cars;
  },
  async getCarById(id: string | number) {
    const cars = CarRepository.getCarById(id);
    return cars;
  },

  async addCar(args: Cars) {
    return await CarRepository.addCar(args);
  },

  async updateCarById(id: string | number, args: Cars) {
    await CarRepository.updateCarById(id, args);
    return;
  },

  async deleteCarById(id: string | number) {
    await CarRepository.deleteCarById(id);
    return;
  },
};
