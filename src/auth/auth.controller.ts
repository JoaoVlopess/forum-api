import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { User } from 'generated/prisma';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    @Inject()
    private readonly authService: AuthService;
    
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() body: { email: string ; password: string;}) {
        return this.authService.signIn(body);
    }
}
