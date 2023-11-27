import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Permission from '../enum/user/UserPermission';
import Status from '../enum/user/UserStatus';

export interface UserDocument extends mongoose.Document {
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: Permission;
  status: string;
  isDriver: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deletedBy: string;
  comparePassword(candidatePassword: string): boolean;
}

const UserSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    permission: { type: String, enum: Permission, required: true, default: Permission.TRAINEE },
    status: { type: String, enum: Status, required: true, default: Status.PENDING },
    isDriver: { type: Boolean, required: true, default: false },
    imageUrl: { type: String, required: false },
    deletedAt: { type: Date, required: false },
    deletedBy: { type: String, required: false },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compareSync(candidatePassword, user.password);
};

const User = mongoose.model<UserDocument>('User', UserSchema, 'user');

export default User;