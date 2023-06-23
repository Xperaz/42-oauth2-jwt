import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
      private readonly jwtService: JwtService,
      private  prisma: PrismaService
  ) {}

     async generateJwt(payload: any)  {
      return {
        accessToken : await this.jwtService.signAsync(payload)
      }
    }

    async signIn(user: Prisma.UserUncheckedCreateInput) {
      if (!user){
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.findUserByLogin(user.login);

      if (!userExists) {
        return await this.registerUser(user);
      }
      
      return this.generateJwt({
        login: userExists.login,
        email: userExists.email,
        avatar: userExists.avatar,
        name: userExists.name,
        banner: userExists.banner,
        intraId: userExists.intraId
      });
    }

    async registerUser(user: Prisma.UserUncheckedCreateInput)  {
      try {
        const newUser = await this.prisma.user.create({
          data: {
          login: user.login,
          email: user.email,
          avatar: user.avatar,
          name: user.name,
          banner: user.banner,
          intraId: user.intraId
          }
        });
        return await this.generateJwt({
          login: newUser.login,
          email: newUser.email,
          avatar: newUser.avatar,
          name: newUser.name,
          banner: newUser.banner,
          intraId: newUser.intraId
        });
        
      } catch(error) {
        console.log(error);
      }
    }
    
    async findUserByLogin(login: string) : Promise<User | undefined> {
      const user = await this.prisma.user.findUnique({
        where: {login: login},
      });
      if (!user) {
        return null;
      }
      return user;
    }

    // async logout(login: string): Promise<void> {
    //   await this.prisma.user.update({
    //     where: { login }
    //     data: { refreshToken: null },
    //   });
    // }

}