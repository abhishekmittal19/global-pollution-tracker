/**
 * Application Constants and Enum Definitions
 */

export const REGIONS = [
  'All Regions',
  'Asia',
  'Europe',
  'North America',
  'Latin America & Caribbean',
  'Africa',
  'Oceania'
];

export const SECTORS = [
  'All Sectors',
  'Energy & Power',
  'Industry',
  'Transport',
  'Buildings',
  'Agriculture & Land Use',
  'Forestry',
  'Waste',
  'Water',
  'Air Quality'
];

export const POLICY_STATUSES = [
  'All Statuses',
  'In Force',
  'Adopted',
  'Proposed',
  'Under Review',
  'Superseded'
];

export const POLICY_TYPES = [
  'All Types',
  'Regulatory & Standards',
  'Economic & Market Instrument',
  'Fiscal & Subsidies',
  'Planning & Strategy',
  'Information & Voluntary'
];

export const INDICATOR_METRICS = [
  {
    id: 'perCapitaCO2',
    name: 'CO₂ per Capita',
    unit: 't CO₂/person',
    category: 'Emissions',
    description: 'Production-based territorial carbon dioxide emissions divided by mid-year population.',
    type: 'CO2'
  },
  {
    id: 'totalEmissionsCO2',
    name: 'Total Territorial CO₂',
    unit: 'Mt CO₂',
    category: 'Emissions',
    description: 'Territorial carbon dioxide emissions from fossil fuel combustion and industrial processes (cement).',
    type: 'CO2'
  },
  {
    id: 'totalGHG',
    name: 'Total Greenhouse Gases',
    unit: 'Mt CO₂eq',
    category: 'Emissions',
    description: 'Aggregate emissions of CO₂, CH₄, N₂O, and F-gases calculated using IPCC 100-year Global Warming Potentials (GWP-100).',
    type: 'GHG'
  },
  {
    id: 'renewableShare',
    name: 'Renewable Electricity Share',
    unit: '%',
    category: 'Energy',
    description: 'Share of total gross electricity generation produced from solar, wind, hydro, bioenergy, and geothermal sources.',
    type: 'Energy'
  },
  {
    id: 'airQualityPM25',
    name: 'Annual Mean PM2.5 Exposure',
    unit: 'µg/m³',
    category: 'Air Quality',
    description: 'Population-weighted annual average concentration of fine particulate matter under 2.5 micrometers.',
    type: 'Air Quality'
  },
  {
    id: 'carbonIntensity',
    name: 'Grid Carbon Intensity',
    unit: 'g CO₂/kWh',
    category: 'Energy',
    description: 'Direct greenhouse-gas emissions generated per kilowatt-hour of electricity produced on the national grid.',
    type: 'Energy'
  }
];

export const DATA_STATUS_BADGES = {
  VERIFIED: {
    label: 'Verified Official / Peer-Reviewed',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotColor: 'bg-emerald-600',
    tooltip: 'Cross-verified against official national inventories (UNFCCC) or established research databases (EDGAR/IEA).'
  },
  REPORTED_NDC: {
    label: 'Self-Reported Government NDC',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    dotColor: 'bg-blue-600',
    tooltip: 'Directly sourced from official Nationally Determined Contributions (NDCs) filed with UNFCCC.'
  },
  ILLUSTRATIVE: {
    label: 'Sample / Illustrative Scenario',
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    dotColor: 'bg-amber-600',
    tooltip: 'Illustrative educational model provided for prototype comparison. Not for scientific policymaking.'
  }
};
