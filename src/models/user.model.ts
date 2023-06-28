import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Permission from '../enum/user/UserPermission';
import Status from '../enum/user/UserStatus';

export interface UserDocument extends mongoose.Document {
  registrationId: string;
  name: string;
  email: string;
  password: string;
  permission: Permission;
  status: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: { type: String, enum: Permission, required: true, default: Permission.TRAINEE },
    status: { type: String, enum: Status, required: true, default: Status.PENDING },
    imageUrl: { type: String, required: false },
    deletedAt: { type: Date, required: false },
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
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema, 'user');

export default User;