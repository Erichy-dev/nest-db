import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ActividadEntity,
  CategoriaEntity, ClienteEntity,
  CotizacionDetalleEntity,
  CotizacionEntity,
  MarcaEntity,
  ModeloEntity,
  OrdenTrabajoDetalleEntity,
  OrdenTrabajoEntity, OrdenTrabajoProductoEntity,
  ProductoEntity,
  TrabajoEntity, UsuarioEntity, VehiculoEntity,
} from './entity';
import { DataLoaderService } from './data-loader/data-loader.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración sea global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('TypeOrmModule');
        logger.log(
          `POSTGRES_HOST: ${configService.get<string>('POSTGRES_HOST')}`,
        );
        logger.log(
          `POSTGRES_PORT: ${configService.get<number>('POSTGRES_PORT')}`,
        );
        logger.log(
          `POSTGRES_USER: ${configService.get<string>('POSTGRES_USER')}`,
        );
        logger.log(`POSTGRES_DB: ${configService.get<string>('POSTGRES_DB')}`);

        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASS'),
          database: configService.get<string>('POSTGRES_DB'),
          schema: configService.get<string>('POSTGRES_SCHEMA'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
          extra: {
            connectionLimit: 10,
            connectTimeout: 5000,
            waitForConnections: true,
            queueLimit: 0,
          },
          autoLoadEntities: true,
          retryAttempts: 500,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      ActividadEntity,
      TrabajoEntity,
      ProductoEntity,
      CategoriaEntity,
      ClienteEntity,
      MarcaEntity,
      ModeloEntity,
      CotizacionEntity,
      CotizacionDetalleEntity,
      OrdenTrabajoEntity,
      OrdenTrabajoDetalleEntity,
      OrdenTrabajoProductoEntity,
      UsuarioEntity,
      VehiculoEntity,
    ]),
  ],
  providers: [DataLoaderService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataLoaderService: DataLoaderService) {}

  async onModuleInit() {
    await this.dataLoaderService.loadData();
  }
}
