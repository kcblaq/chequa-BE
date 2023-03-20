import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaconModule } from './prismacon/prismacon.module';

@Module({
  imports: [AuthModule, PrismaconModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
