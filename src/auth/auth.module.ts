/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
//import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { jwtConstants } from "./constants/jwt.constant";


// import { MailerModule } from "@nestjs-modules/mailer";
// import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
  imports: [
    UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: "1d" },
    // }),
   
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
