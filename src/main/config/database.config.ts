import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'node:path'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'exam_system',
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
}
