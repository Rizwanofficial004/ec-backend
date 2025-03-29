import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10; // Explicitly set salt rounds

  async hash(data: string): Promise<string> {
    const salt = await genSalt(this.saltRounds); // Use defined salt rounds
    return hash(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    console.log('🚀 ~ BcryptService ~ compare ~ encrypted:', encrypted);
    console.log('🚀 ~ BcryptService ~ compare ~ data:', data);
    return compare(data, encrypted);
  }
}
