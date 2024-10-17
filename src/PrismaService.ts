import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const dbUrl = configService.get<string>('DATABASE_URL');
    console.log('Connecting to database with URL:', dbUrl);
    super({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
