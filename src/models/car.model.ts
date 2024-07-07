import { Model, ModelObject } from "objection";
import { CarLogModel } from "./carLog.model ";

export class CarsModel extends Model {
  id?: number;
  model!: string;
  manufacture!: string;
  plate!: string;
  image_url?: string;
  price!: number;
  category!: string;
  created_at?: Date;
  updated_at!: Date;
  available?: boolean;

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      car_logs: {
        relation: Model.HasManyRelation,
        modelClass: CarLogModel,
        join: {
          from: "cars.id",
          to: "car_logs.car_id",
        },
      },
    };
  }
}

export type Cars = ModelObject<CarsModel>;
