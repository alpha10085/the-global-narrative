import mongoose, { Schema, model, models } from "mongoose";

export const Roles_permissions = {
  read: "READ", 
  update: "UPDATE", 
  delete: "DELETE", 
  create: "CREATE" 
};
Object.freeze(Roles_permissions);


const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    description: {
      type: String,
      trim: true,
    },
    roles: [
      {
        key: {
          type: String,
          unique: [true, "name is required"],
          trim: true,
          required: true,
          minLength: [2, "too short category name"],
        },
        permissions: [
          {
            type: String,
            enum: Object.values(Roles_permissions),
            default: Roles_permissions.read,
          },
        ],
      },
    ],
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const UserRoleModel = models?.user_roles || model("user_roles", schema);
export default UserRoleModel;
