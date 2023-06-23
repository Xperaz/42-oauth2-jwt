import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Post,
  Res,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { IntraAuthGuard } from './guards/intra-oauth.guard';
;
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  login() {
    return;
  }

  @UseGuards(AuthGuard('42'))
  @Get('42')
  async login42(@Req() req: any) {

  }

  @UseGuards(AuthGuard('42'))
  @Get('callback')
  async IntraAuthCallback(@Req() req: any, @Res() res: Response) {
    try {

      const result = await this.authService.signIn(req.user);
      const { accessToken } = result;
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        sameSite: false,
      });
      res.redirect(`http://localhost:3000/${accessToken}` );
    }
    catch (error) {
      res.status(400).json(error)
    }
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    res.clearCookie('access_token');
    await this.authService.logout(req.user.login);
    res.sendStatus(200);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: any) {
    return req.user;
  }

}