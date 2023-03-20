import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class PrismaconService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private config: ConfigService) {
        super({
					datasources: {
						db: {
							url: config.get('DATABASE_URL'),
						},
					},
				});
    }
    onModuleInit() {
        this.$connect
        
    }
    onModuleDestroy() {
        this.$disconnect
    }
}
