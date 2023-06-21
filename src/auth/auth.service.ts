import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate hash
    const hash = await argon.hash(dto.password);

    // save user in db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    delete user.hash;

    // return saved user
    return user;
  }

  signin() {
    return { msg: 'SignIn!' };
  }
}
