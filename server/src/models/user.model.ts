import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  plaidAccessToken?: string;
  plaidItemId?: string;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken: () => string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  plaidAccessToken: {
    type: String
  },
  plaidItemId: {
    type: String
  }
}, {
  timestamps: true
});

// Generate JWT token
userSchema.methods.generateAuthToken = function(): string {
  return jwt.sign(
    { userId: this._id },
    config.jwtSecret,
    { expiresIn: '24h' }
  );
};

// Remove sensitive data when converting to JSON
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
