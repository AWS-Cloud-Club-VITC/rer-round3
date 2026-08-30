import { DiurnalPhase } from '../types/energy';

export const getDiurnalPhase = (date: Date = new Date()): DiurnalPhase => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 8) return 'DAWN';
  if (hour >= 8 && hour < 18) return 'DAYLIGHT';
  if (hour >= 18 && hour < 21) return 'DUSK';
  return 'NIGHT';
};

export const getTimeProfileInfo = (phase: DiurnalPhase) => {
  switch (phase) {
    case 'DAWN':
      return {
        label: 'DAWN',
        solarAvailability: 'Ramping Up',
        lightingDemand: 'Decreasing',
        description: 'Morning transition with sunrise photovoltaic activation.',
        accentColor: '#D97706',
      };
    case 'DAYLIGHT':
      return {
        label: 'DAYLIGHT',
        solarAvailability: 'Peak Harvesting',
        lightingDemand: 'Offline',
        description: 'Maximum solar yield actively charging BESS storage buffers.',
        accentColor: '#EAB308',
      };
    case 'DUSK':
      return {
        label: 'DUSK',
        solarAvailability: 'Declining Yield',
        lightingDemand: 'Activating',
        description: 'Photovoltaic drop; municipal transition to battery reserves.',
        accentColor: '#F97316',
      };
    case 'NIGHT':
      return {
        label: 'NIGHT',
        solarAvailability: 'Storage Dependent',
        lightingDemand: '100% Active',
        description: 'Nocturnal operations powered by stored BESS and base grid.',
        accentColor: '#0284C7',
      };
  }
};
