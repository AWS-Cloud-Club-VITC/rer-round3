import { UrbanSystem } from '../types/energy';

export const BASE_GRID_CAPACITY_KWH = 350;
export const MAX_SOLAR_CAPACITY_KWH = 300;
export const MAX_BATTERY_CAPACITY_KWH = 500;

export const BASE_URBAN_SYSTEMS: Omit<UrbanSystem, 'currentDemandKwh' | 'allocatedKwh' | 'poweredPercentage' | 'powerState'>[] = [
  {
    id: 'hospital',
    name: 'HOSPITALS & EMERGENCY',
    category: 'Critical Healthcare Infrastructure',
    priority: 1,
    criticality: 'CRITICAL',
    baseDemandKwh: 220,
    accentColor: '#059669', // Emerald
    description: 'ICU trauma wards, life-support microgrids, and surgical theaters requiring uninterruptible power supply.',
  },
  {
    id: 'transit',
    name: 'PUBLIC TRANSIT & MONORAIL',
    category: 'Urban Mobility Arteries',
    priority: 2,
    criticality: 'HIGH',
    baseDemandKwh: 180,
    accentColor: '#0284C7', // Electric Blue
    description: 'Electrified high-speed monorail corridors and signaling systems supporting nocturnal passenger flow.',
  },
  {
    id: 'lighting',
    name: 'STREET LIGHTING NETWORK',
    category: 'Public Safety & Corridors',
    priority: 3,
    criticality: 'MEDIUM',
    baseDemandKwh: 90,
    accentColor: '#D97706', // Warm Amber
    description: 'Intelligent arterial roadway lamps and pedestrian boulevard illumination across municipal avenues.',
  },
  {
    id: 'residential',
    name: 'RESIDENTIAL DISTRICTS',
    category: 'High-Density Housing Towers',
    priority: 4,
    criticality: 'MEDIUM',
    baseDemandKwh: 210,
    accentColor: '#7C3AED', // Purple
    description: 'Domestic evening power, domestic appliances, water pumps, and residential building services.',
  },
  {
    id: 'offices',
    name: 'COMMERCIAL & OFFICE HUBS',
    category: 'Business Center Towers',
    priority: 5,
    criticality: 'COMMERCIAL',
    baseDemandKwh: 120,
    accentColor: '#0891B2', // Soft Cyan
    description: 'Corporate high-rises, commercial retail complexes, and secondary office floor illumination.',
  },
];
