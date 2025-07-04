import * as migration_20250704_195633_migration from './20250704_195633_migration';

export const migrations = [
  {
    up: migration_20250704_195633_migration.up,
    down: migration_20250704_195633_migration.down,
    name: '20250704_195633_migration'
  },
];
