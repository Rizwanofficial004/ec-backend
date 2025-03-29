import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({ timestamps: true }) // Adds createdAt & updatedAt fields automatically
export class Token {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Use 'User' as a string reference
  userId: Types.ObjectId;

  @Prop({ type: Object, default: null }) // Storing JSON data
  refreshToken?: Record<string, any> | null;

  @Prop({ type: Object, default: null }) // Storing JSON data
  resetPassToken?: Record<string, any> | null;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
