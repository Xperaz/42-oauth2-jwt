import { Injectable, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IntraStrategy } from './strategies/intra-oauth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
  }), PrismaModule],
  providers: [AuthService, JwtStrategy, IntraStrategy, PrismaClient, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}