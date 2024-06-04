import { Model, ModelObject } from "objection";

export class UserModel extends Model {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "user.id",
          to: "car_log.created_by",
        },
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "user.id",
          to: "car_log.updated_by",
        },
      },
      deletedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "user.id",
          to: "car_log.deleted_by",
        },
      },
    };
  }
}

export type Users = ModelObject<UserModel>;
