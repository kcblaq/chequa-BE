import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class PrismaconService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private config;
    constructor(config: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
}
