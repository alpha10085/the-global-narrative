import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { enumRoles } from "../../assets/enums/Roles_permissions";
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    passwordChangedAt: Date,
    phone: { type: String, trim: true },
    pincode: Number,
    isresetPassword: { type: Boolean, default: false },
    role: {
      type: String,
      enum: enumRoles.all,
      default: enumRoles?.user,
    },
    confirmEmail: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isblocked: { type: Boolean, default: false },
    createdBy: { type: ObjectId, ref: "user" },
    updatedBy: { type: ObjectId, ref: "user" },
  },
  { timestamps: true }
);
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});
schema.pre("findOneAndUpdate", async function (next) {
  // Check if password is being updated
  const update = this.getUpdate();
  if (update && update?.password) {
    update.password = bcrypt.hashSync(update.password, 8);
  }
  next();
});

const UserModel = models?.user || model("user", schema);
export default UserModel;
