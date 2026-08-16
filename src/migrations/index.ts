import * as migration_20260813_063814_initial_schema from './20260813_063814_initial_schema';
import * as migration_20260813_215551_map_locations from './20260813_215551_map_locations';

export const migrations = [
  {
    up: migration_20260813_063814_initial_schema.up,
    down: migration_20260813_063814_initial_schema.down,
    name: '20260813_063814_initial_schema',
  },
  {
    up: migration_20260813_215551_map_locations.up,
    down: migration_20260813_215551_map_locations.down,
    name: '20260813_215551_map_locations'
  },
];
