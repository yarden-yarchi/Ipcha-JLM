import * as migration_20260813_063814_initial_schema from './20260813_063814_initial_schema';
import * as migration_20260813_215551_map_locations from './20260813_215551_map_locations';
import * as migration_20260817_064512_contact_consent_fields from './20260817_064512_contact_consent_fields';
import * as migration_20261014_064132_add_status_field from './20261014_064132_add_status_field';

export const migrations = [
  {
    up: migration_20260813_063814_initial_schema.up,
    down: migration_20260813_063814_initial_schema.down,
    name: '20260813_063814_initial_schema',
  },
  {
    up: migration_20260813_215551_map_locations.up,
    down: migration_20260813_215551_map_locations.down,
    name: '20260813_215551_map_locations',
  },
  {
    up: migration_20260817_064512_contact_consent_fields.up,
    down: migration_20260817_064512_contact_consent_fields.down,
    name: '20260817_064512_contact_consent_fields',
  },
  {
    up: migration_20261014_064132_add_status_field.up,
    down: migration_20261014_064132_add_status_field.down,
    name: '20261014_064132_add_status_field'
  },
];
