import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class IdentityService {
  constructor(private cls: ClsService) {}
  getUserId(): string {
    const userId: string = this.cls.get('USER_ID');

    if (!userId) {
      throw new UnauthorizedException('User is not authenticated');
    }

    return userId;
  }

  getEmail(): string {
    const email: string = this.cls.get('EMAIL');

    if (!email) {
      throw new UnauthorizedException('User is not authenticated');
    }

    return email;
  }
}
