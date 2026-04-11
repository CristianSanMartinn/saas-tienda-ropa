// apps/api/src/app.module.ts

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule }      from './modules/auth/auth.module'
import { UsersModule }     from './modules/users/users.module'
import { ProductsModule }  from './modules/products/products.module'
import  { OrdersModule }    from './modules/orders/orders.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:     'postgres',
        host:     config.get('DB_HOST'),
        port:     config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities:    [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging:     false,
      }),
    }),

    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    AnalyticsModule,
  ],
})
export class AppModule {}