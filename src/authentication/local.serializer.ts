import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: any, done: CallableFunction) {
    const user = await this.userService.getById(Number(userId));
    done(null, user);
  }
}
