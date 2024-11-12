import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  ActividadEntity,
  CategoriaEntity, ClienteEntity,
  CotizacionDetalleEntity,
  CotizacionEntity,
  MarcaEntity,
  ModeloEntity,
  OrdenTrabajoDetalleEntity,
  OrdenTrabajoEntity,
  OrdenTrabajoProductoEntity,
  ProductoEntity,
  TrabajoEntity,
  UsuarioEntity,
  VehiculoEntity,
} from '../entity';
import trabajos from './trabajos.json';
import actividades from './actividades.json';
import categorias from './categorias.json';
import marcas from './marcas.json';
import modelos from './modelos.json';
import productos from './productos.json';
import cotizaciones from './cotizaciones.json';
import cotizacionDetalles from './cotizacion_detalles.json';
import ordenesTrabajo from './ordenes_trabajo.json';
import ordenTrabajoDetalles from './orden_trabajo_detalles.json';
import ordenTrabajoProductos from './orden_trabajo_productos.json';
import usuarios from './usuarios.json';
import vehiculos from './vehiculos.json';
import clientes from './cliente.json';

@Injectable()
export class DataLoaderService {
  constructor(
    @InjectRepository(CotizacionEntity)
    private readonly cotizacionRepository: Repository<CotizacionEntity>,
    @InjectRepository(CotizacionDetalleEntity)
    private readonly cotizacionDetalleRepository: Repository<CotizacionDetalleEntity>,
    @InjectRepository(OrdenTrabajoEntity)
    private readonly ordenTrabajoRepository: Repository<OrdenTrabajoEntity>,
    @InjectRepository(OrdenTrabajoDetalleEntity)
    private readonly ordenTrabajoDetalleRepository: Repository<OrdenTrabajoDetalleEntity>,
    @InjectRepository(OrdenTrabajoProductoEntity)
    private readonly ordenTrabajoProductoRepository: Repository<OrdenTrabajoProductoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(VehiculoEntity)
    private readonly vehiculoRepository: Repository<VehiculoEntity>,
    @InjectRepository(TrabajoEntity)
    private readonly trabajoRepository: Repository<TrabajoEntity>,
    @InjectRepository(ActividadEntity)
    private readonly actividadRepository: Repository<ActividadEntity>,
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
    @InjectRepository(MarcaEntity)
    private readonly marcaRepository: Repository<MarcaEntity>,
    @InjectRepository(ModeloEntity)
    private readonly modeloRepository: Repository<ModeloEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async truncateTables() {
    const schema = this.configService.get<string>('POSTGRES_SCHEMA');
    const tables = [
      'cotizacion',
      'cotizacion_detalle',
      'orden_trabajo',
      'orden_trabajo_detalle',
      'orden_trabajo_producto',
      'usuario',
      'vehiculo',
      'trabajo',
      'producto',
      'actividad',
      'categoria',
      'marca',
      'modelo',
    ];

    for (const table of tables) {
      await this.dataSource.query(`TRUNCATE TABLE ${schema}.${table} RESTART IDENTITY CASCADE`);
    }
  }

  async loadData() {
    await this.truncateTables();

    const clienteEntities = this.clienteRepository.create(clientes);
    await this.clienteRepository.save(clienteEntities);

    // Insertar trabajos
    const trabajosEntities = this.trabajoRepository.create(trabajos);
    await this.trabajoRepository.save(trabajosEntities);

    // Insertar actividades
    const actividadesEntities = this.actividadRepository.create(actividades);
    await this.actividadRepository.save(actividadesEntities);

    // Asignar actividades a trabajos (relaciones)
    const trabajosNombres = [
      'Mantenimiento por Kilometraje',
      'Levante de Suspensión',
      'Actualización de Rines',
      'Diagnóstico y Reparación Eléctrica',
      'Mantenimiento del Sistema de Frenos',
      'Mantenimiento del Sistema de Escape',
      'Mantenimiento del Sistema de Refrigeración',
      'Mantenimiento del Motor',
      'Mantenimiento del Sistema de Dirección',
      'Mantenimiento del Sistema de Transmisión',
      'Mantenimiento del Sistema de Aire Acondicionado',
    ];

    const actividadesPorTrabajo = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
      [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
      [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
      [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
    ];

    for (let i = 0; i < trabajosNombres.length; i++) {
      const trabajo = await this.trabajoRepository.findOne({
        where: { nombre: trabajosNombres[i] },
      });
      if (trabajo) {
        trabajo.actividades = await this.actividadRepository.findByIds(actividadesPorTrabajo[i]);
        await this.trabajoRepository.save(trabajo);
      }
    }

    console.log('Insertar categorías');
    const categoriasEntities = this.categoriaRepository.create(categorias);
    await this.categoriaRepository.save(categoriasEntities);

    console.log('Insertar marcas');
    const marcasEntities = this.marcaRepository.create(marcas);
    await this.marcaRepository.save(marcasEntities);

    console.log('Insertar modelos');
    const modelosEntities = [];
    for (const modelo of modelos) {
      const marcaEntity = await this.marcaRepository.findOne({
        where: { nombre: modelo.marca },
      });
      const modeloEntity = this.modeloRepository.create({
        nombre: modelo.nombre,
        marca: marcaEntity,
      });
      modelosEntities.push(modeloEntity);
    }
    await this.modeloRepository.save(modelosEntities);

    console.log('Insertar productos');
    for (const producto of productos) {
      const categoriaEntity = await this.categoriaRepository.findOne({
        where: { nombre: producto.categoria },
      });
      let modeloEntity = await this.modeloRepository.findOne({
        where: { nombre: producto.modelo },
      });

      // Asigna un modelo por defecto si no se encuentra uno
      if (!modeloEntity) {
        const defaultModel = await this.modeloRepository.findOne({
          where: { nombre: 'Modelo por defecto' },
        });
        if (!defaultModel) {
          const newDefaultModel = this.modeloRepository.create({
            nombre: 'Modelo por defecto',
            marca: null,
          });
          modeloEntity = await this.modeloRepository.save(newDefaultModel);
        } else {
          modeloEntity = defaultModel;
        }
      }

      const productoEntity = this.productoRepository.create({
        nombre: producto.nombre,
        categoria: categoriaEntity,
        modelo: modeloEntity,
      });
      await this.productoRepository.save(productoEntity);
    }

    console.log('Insertar cotizaciones');
    const cotizacionesEntities = this.cotizacionRepository.create(cotizaciones);
    await this.cotizacionRepository.save(cotizacionesEntities);

    console.log('Insertar cotizaciones detalle');
    const cotizacionDetalleEntities = [];
    for (const detalle of cotizacionDetalles) {
      const cotizacionEntity = await this.cotizacionRepository.findOne({
        where: { id: detalle.cotizacion },
      });
      const trabajos = await this.trabajoRepository.find({ where: { id: In(detalle.trabajos)}})
      const detalleEntity = this.cotizacionDetalleRepository.create({
        ...detalle,
        cotizacion: cotizacionEntity,
        trabajos
      });
      cotizacionDetalleEntities.push(detalleEntity);
    }
    await this.cotizacionDetalleRepository.save(cotizacionDetalleEntities);

    console.log('Insertar orden trabajos');
    const ordenesTrabajoEntities = [];
    for (const orden of ordenesTrabajo) {
      const vehiculoEntity = await this.vehiculoRepository.findOne({
        where: { id: orden.vehiculo },
      });
      const cotizacionEntity = await this.cotizacionRepository.find({
        where: { id: In(orden.cotizaciones) },
      });
      const usuariosEntities = [];
      for (const usuarioId of orden.usuarios) {
        const usuarioEntity = await this.usuarioRepository.findOne({
          where: { id: usuarioId },
        });
        usuariosEntities.push(usuarioEntity);
      }
      const ordenTrabajoEntity = this.ordenTrabajoRepository.create({
        ...orden,
        vehiculo: vehiculoEntity,
        cotizaciones: cotizacionEntity,
        usuarios: usuariosEntities,
      });
      ordenesTrabajoEntities.push(ordenTrabajoEntity);
    }
    await this.ordenTrabajoRepository.save(ordenesTrabajoEntities);

    console.log('Insertar orden trabajos detalle');
    const ordenTrabajoDetalleEntities = [];
    for (const detalle of ordenTrabajoDetalles) {
      const ordenTrabajoEntity = await this.ordenTrabajoRepository.findOne({
        where: { id: detalle.ordenTrabajo },
      });
      const trabajos = await this.trabajoRepository.find({ where: { id: In(detalle.trabajos) }})
      const detalleEntity = this.ordenTrabajoDetalleRepository.create({
        ...detalle,
        ordenTrabajo: ordenTrabajoEntity,
        trabajos,
      });
      ordenTrabajoDetalleEntities.push(detalleEntity);
    }
    await this.ordenTrabajoDetalleRepository.save(ordenTrabajoDetalleEntities);

    console.log('Insertar productos orden trabajos');
    // Insertar productos de órdenes de trabajos
    const ordenTrabajoProductoEntities = [];
    for (const producto of ordenTrabajoProductos) {
      const ordenTrabajoEntity = await this.ordenTrabajoRepository.findOne({
        where: { id: producto.ordenTrabajo },
      });
      const productoEntity = await this.productoRepository.findOne({
        where: { id: producto.producto },
      });
      const productoOrdenTrabajoEntity = this.ordenTrabajoProductoRepository.create({
        ...producto,
        ordenTrabajo: ordenTrabajoEntity,
        producto: productoEntity,
      });
      ordenTrabajoProductoEntities.push(productoOrdenTrabajoEntity);
    }
    await this.ordenTrabajoProductoRepository.save(ordenTrabajoProductoEntities);

    console.log('Insertar usuarios');
    const usuarioEntities = [];
    for (const usuario of usuarios) {
      const ordenesTrabajoEntities = [];
      for (const ordenId of usuario.ordenesTrabajo) {
        const ordenTrabajoEntity = await this.ordenTrabajoRepository.findOne({
          where: { id: ordenId },
        });
        ordenesTrabajoEntities.push(ordenTrabajoEntity);
      }
      const usuarioEntity = this.usuarioRepository.create({
        ...usuario,
        ordenesTrabajo: ordenesTrabajoEntities,
      });
      usuarioEntities.push(usuarioEntity);
    }
    await this.usuarioRepository.save(usuarioEntities);

    console.log('Insertar vehículos');
    const vehiculoEntities = [];
    for (const vehiculo of vehiculos) {
      const ordenesTrabajoEntities = [];
      for (const ordenId of vehiculo.ordenesTrabajo) {
        const ordenTrabajoEntity = await this.ordenTrabajoRepository.findOne({
          where: { id: ordenId },
        });
        ordenesTrabajoEntities.push(ordenTrabajoEntity);
      }
      const cliente = await this.clienteRepository.findOne({ where: { id: vehiculo.cliente}});
      const modelo = await this.modeloRepository.findOne({ where: { id: vehiculo.modelo }})
      const vehiculoEntity = this.vehiculoRepository.create({
        ...vehiculo,
        ordenesTrabajo: ordenesTrabajoEntities,
        cliente,
        modelo,
      });
      vehiculoEntities.push(vehiculoEntity);
    }
    await this.vehiculoRepository.save(vehiculoEntities);

    console.log('Datos iniciales cargados correctamente con relaciones establecidas');
  }
}
