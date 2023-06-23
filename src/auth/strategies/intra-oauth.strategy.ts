import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Strategy } from 'passport-42';
import { User } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class IntraStrategy extends PassportStrategy( Strategy, '42') {
  constructor(
  private readonly authService: AuthService,) {
    super(
      {
        clientID: process.env.INTRA_UID,
        clientSecret: process.env.INTRA_SECRET,
        callbackURL: process.env.INTRA_CALLBACK_URI,
        scope:['public'],
      });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) : Promise<any> {
    const user : User= {
      login: profile._json.login, email: profile._json.email, avatar: profile._json.image.link, 
      name: profile._json.usual_full_name, banner: '', id: 0, intraId: profile._json.id
    };
    done(null, user);
  }
}



