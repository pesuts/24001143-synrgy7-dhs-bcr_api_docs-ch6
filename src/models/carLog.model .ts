import { Model, ModelObject } from "objection";
import { UserModel } from "./user.model";

export class CarLogModel extends Model {
  car_id!: number;
  created_by!: number;
  updated_by?: number;
  deleted_by?: number;

  static get tableName() {
    return "car_logs";
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "car_logs.created_by",
          to: "users.id",
        },
      },
      updatedBy: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "car_logs.updated_by",
          to: "users.id",
        },
      },
      deletedBy: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "car_logs.deleted_by",
          to: "users.id",
        },
      },
    };
  }
}

export type CarLog = ModelObject<CarLogModel>;
