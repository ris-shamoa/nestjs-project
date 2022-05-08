import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ["dist/**/*.entity{.ts,.js}"],// be careful with the path u may have to change it for prod
        synchronize: true,  //its better to have synchronize as false for production. this creates the table if not there
        migrations: ["dist/common/migrations/*{.ts,.js}"],
        cli: {
          migrationsDir: "src/common/migrations"
        },
        migrationsRun: true
      })

    })
  ]
})
export class DatabaseModule { }