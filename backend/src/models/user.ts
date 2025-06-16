import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isMfaActive:{
      type: Boolean,
      default: false,
      required: false,
  },
  twoFactorSecret: {
    type: String,
  },
},{
    timestamps: true,
});

type UserType = InferSchemaType<typeof userSchema>; 

const User = mongoose.model('User', userSchema);

export type { UserType };
export default User;