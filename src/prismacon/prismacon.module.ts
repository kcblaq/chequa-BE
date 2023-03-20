import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaconService } from './prismacon.service';

@Global()
@Module({
  providers: [PrismaconService, ConfigService],
  exports: [PrismaconService]
})
export class PrismaconModule {}
