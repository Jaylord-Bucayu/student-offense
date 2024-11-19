import { Controller,Post,Body,  Get, UseGuards, Req, Res, HttpStatus, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsersService } from '../users/users.service';
import { SignInUser } from '../users/dto/signIn-user.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  //AUTH
  @Post('login')
  login(@Body() body: LoginDto){
   
    return this.authService.login(body)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleRedirect(){
    return 'google redirect'
  }


  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard("facebook"))
  @Get('facebook/callback')
  async facebookAuthCallback(){
    return 'google redirect'
  }


  @Post('register')
  async register(@Body() body: RegisterDto){
    return this.authService.register(body)
    
  }


  @Post('refresh')
  @UseGuards(JwtGuard)
   refreshToken(@Request() req:any){
    const signInUser = req.user;
    if(!signInUser)  {
      throw new UnauthorizedException('Unauthorized');
   }
    return this.authService.refreshToken(signInUser);
  
  }


  @Post('forgot-password')
  forgotPassword(){
    
  }

  @Post('reset-password')
  resetPassword(){
    
  }

  @Post('change-password')
  @UseGuards(JwtGuard)
  async changePassword(@Req() req:SignInUser, @Body() body: ChangePasswordDto): Promise<void> {

    const userId = req.user.id;
    if(!req.user)  {
       throw new UnauthorizedException('Unauthorized');
    }
    // Update the user's password in the database
    await this.authService.changePassword(userId,body)
  }


}
