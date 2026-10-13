/**
 * Environmental Measurement & Methodology Knowledge Base.
 * Detailed scientific frameworks for greenhouse-gas accounting, air quality monitoring,
 * baseline year selection, and comparison between official state inventories and third-party trackers.
 */

export const METHODOLOGIES = [
  {
    id: 'territorial-vs-consumption',
    title: 'Territorial vs. Consumption-Based Emissions Accounting',
    category: 'Emissions Accounting',
    shortDescription: 'How trade and cross-border supply chains alter national emissions responsibilities.',
    boundaryType: 'Geographic vs. Consumer Footprint',
    establishedBy: 'IPCC / Global Carbon Project / OECD',
    summary: 'The standard UNFCCC framework attributes emissions to the country where combustion or chemical transformation physically occurs (Territorial / Production-based). In contrast, Consumption-based accounting adjusts for international trade using Multi-Regional Input-Output (MRIO) tables, allocating emissions to the end consumer of final goods and services.',
    principles: [
      {
        aspect: 'Measurement Boundary',
        territorial: 'Physical emissions produced inside sovereign domestic borders, domestic exclusive economic zones, and national airspace.',
        consumption: 'Emissions embedded across global supply chains required to manufacture products consumed within the country (Domestic + Imports - Exports).'
      },
      {
        aspect: 'Trade Treatment',
        territorial: 'Exporters bear the carbon emissions of goods produced for foreign consumption (e.g. steel, electronics, solar panels produced in China or India for export).',
        consumption: 'Importers absorb the upstream embodied emissions of imported goods; exporters receive credit for exported embodied emissions.'
      },
      {
        aspect: 'Legal Status',
        territorial: 'Official benchmark for UNFCCC Nationally Determined Contributions (NDCs) and Kyoto/Paris treaties.',
        consumption: 'Scientific analytical diagnostic (OECD, Global Carbon Budget). Used for border carbon adjustments (e.g. EU CBAM) but not official treaty compliance.'
      },
      {
        aspect: 'Uncertainty Range',
        territorial: 'Low to moderate (±5% for Annex I fossil fuel combustion).',
        consumption: 'Moderate to high (±10% to ±15%) due to trade matrix aggregation and supply-chain sector resolution.'
      }
    ],
    realWorldImpact: 'Developed post-industrial economies (Germany, UK, USA) typically have consumption footprints 8% to 40% higher than their territorial inventories due to imported manufactured goods. Developing manufacturing hubs (China, India) have territorial emissions that exceed consumption footprints by 5% to 15% because they produce goods consumed worldwide.',
    guidanceNote: 'When comparing countries, never mix territorial data with consumption data without explicit labels.'
  },

  {
    id: 'ghg-scope-gwp',
    title: 'Greenhouse Gas Aggregation & Global Warming Potential (GWP)',
    category: 'Emissions Metrics',
    shortDescription: 'Conversion of methane, nitrous oxide, and fluorinated gases into CO₂ equivalents.',
    boundaryType: 'Radiative Forcing Equivalency',
    establishedBy: 'IPCC Assessment Reports (AR4, AR5, AR6)',
    summary: 'Different greenhouse gases trap heat with varying potency and atmospheric lifetimes. To express emissions in a single common metric (Mt CO₂eq), non-CO₂ gases are multiplied by their Global Warming Potential over a defined time horizon (typically 100 years, GWP-100).',
    principles: [
      {
        aspect: 'Carbon Dioxide (CO₂)',
        territorial: 'GWP = 1 (Reference gas). Atmospheric lifetime spans centuries to millennia.',
        consumption: 'Primary driver of long-term warming; sourced from fossil combustion, cement calcination, and flaring.'
      },
      {
        aspect: 'Methane (CH₄)',
        territorial: 'AR5 GWP-100 = 28 (without carbon-climate feedback) or 34 (with feedback). Short atmospheric lifetime (~12 years), making near-term abatement crucial.',
        consumption: 'Dominant in agriculture (cattle, paddy rice), coal mine venting, and natural gas pipeline leaks.'
      },
      {
        aspect: 'Nitrous Oxide (N₂O)',
        territorial: 'AR5 GWP-100 = 265. Long atmospheric lifetime (~114 years); major agricultural fertilizer byproduct.',
        consumption: 'Dominant source is synthetic nitrogen fertilizer application and animal manure management.'
      },
      {
        aspect: 'Fluorinated Gases (F-Gases)',
        territorial: 'HFCs, PFCs, SF₆. GWP-100 ranges from 1,000 to over 23,500 (SF₆ is the most potent known GHG).',
        consumption: 'Used in refrigeration, electrical switchgear, semiconductor fabrication, and heat pumps.'
      }
    ],
    realWorldImpact: 'Using IPCC AR4 values vs AR5 or AR6 values shifts national GHG totals by 2-5%, which can distort progress claims if baseline and reporting years use mismatched GWP vintages.',
    guidanceNote: 'Under Paris Agreement Decision 18/CMA.1, all parties must use IPCC AR5 GWP-100 values for national inventory reporting from 2024 onward.'
  },

  {
    id: 'pm25-monitoring',
    title: 'Ambient Particulate Matter (PM2.5) Measurement Methodologies',
    category: 'Air Quality',
    shortDescription: 'Surface monitoring networks vs satellite aerosol optical depth modeling.',
    boundaryType: 'Atmospheric Concentration (µg/m³)',
    establishedBy: 'World Health Organization (WHO) & National Environmental Agencies',
    summary: 'Fine particulate matter (PM2.5) measures microscopic particles under 2.5 microns that penetrate deep into the human respiratory and cardiovascular systems. Measurement techniques vary drastically between ground reference stations and satellite remote sensing models.',
    principles: [
      {
        aspect: 'Ground Reference Stations (Federal / In-Situ)',
        territorial: 'Beta Attenuation Monitors (BAM) and gravimetric filter samplers. High precision (±5%), continuous 15-minute readings, but spatially sparse in rural areas.',
        consumption: 'Standard used for legal air quality warnings, city-level AQI indices, and statutory enforcement.'
      },
      {
        aspect: 'Satellite-Derived Estimates (MODIS / Sentinel-5P)',
        territorial: 'Aerosol Optical Depth (AOD) integrated with chemical transport models (GEOS-Chem) and calibrated against ground stations.',
        consumption: 'Provides complete geographic coverage across uninhabited or unmonitored zones; enables population-weighted national exposure calculations.'
      },
      {
        aspect: 'WHO Health Guideline Thresholds',
        territorial: 'Annual Mean guideline: 5 µg/m³. 24-hour mean guideline: 15 µg/m³ (WHO Global Air Quality Guidelines 2021).',
        consumption: 'Most developing cities currently exceed WHO recommendations by 4x to 10x.'
      }
    ],
    realWorldImpact: 'A country with only capital-city monitors will appear to have different pollution averages compared to one reporting satellite population-weighted figures across all provinces.',
    guidanceNote: 'Always check whether PM2.5 statistics cite urban station averages or national population-weighted satellite integrals.'
  },

  {
    id: 'baseline-year-frameworks',
    title: 'Baseline Year Selection & Target Frameworks in NDCs',
    category: 'Target Frameworks',
    shortDescription: 'How choice of 1990, 2005, or 2013 changes the stringency of emissions commitments.',
    boundaryType: 'Historical Reference Benchmark',
    establishedBy: 'UNFCCC Paris Agreement Articles 4.2 & 4.8',
    summary: 'The Paris Agreement allows countries to self-determine their baseline years and target formulas. As a result, percentage reductions from different countries cannot be compared without normalizing against common reference years and metric structures.',
    principles: [
      {
        aspect: '1990 Baseline (e.g., EU, Germany, UK)',
        territorial: 'Anchored in the original Kyoto Protocol reference year. Captures structural changes since the end of the Cold War and early industrial transitions.',
        consumption: 'Provides a long historical runway showing sustained 40-50% reductions over three decades.'
      },
      {
        aspect: '2005 Baseline (e.g., USA, Canada, India intensity)',
        territorial: 'Anchored around the year of peak emissions for several developed nations, or peak intensity benchmarks for emerging economies.',
        consumption: 'Easier to measure using modernized digital statistical databases than 1990 data.'
      },
      {
        aspect: 'Intensity Target vs Absolute Cap',
        territorial: 'Emerging economies (India, China) target emissions intensity per unit of GDP, allowing absolute emissions to expand while decoupling growth from emissions.',
        consumption: 'Developed economies target absolute volumetric caps (e.g. Mt CO₂eq reductions regardless of economic growth rate).'
      }
    ],
    realWorldImpact: 'A -50% intensity target in a country growing at 6% annually still corresponds to an increase in absolute emissions, whereas a -50% absolute cap requires total emissions to contract by half.',
    guidanceNote: 'Never compare an intensity target directly to an absolute emissions cap without calculating projected net emissions.'
  }
];

export const INVENTORY_COMPARISON_MATRIX = [
  {
    feature: 'Primary Governance',
    unfccc: 'Party-reported sovereign inventories under UNFCCC review',
    edgar: 'European Commission Joint Research Centre (JRC)',
    climateTrace: 'Independent satellite & AI consortium',
    gcp: 'International scientific research community (Global Carbon Project)'
  },
  {
    feature: 'Data Timeliness',
    unfccc: '18-24 months lag for Annex I; longer for Non-Annex I national communications',
    edgar: 'Annual updates with ~9-12 months publication lag',
    climateTrace: 'Near real-time / monthly updates via remote sensing',
    gcp: 'Annual release coinciding with UNFCCC COP'
  },
  {
    feature: 'Emissions Attribution',
    unfccc: 'Territorial standard; self-reported national activity data',
    edgar: 'Territorial standard using harmonized global activity data (IEA, FAO)',
    climateTrace: 'Asset-level bottom-up physical observations (power plants, ships, mines)',
    gcp: 'Both territorial and trade-adjusted consumption emissions'
  },
  {
    feature: 'Primary Strength',
    unfccc: 'Official legal compliance basis for Paris Agreement NDCs',
    edgar: 'Consistent, unbiased methodology applied uniformly to all ~200 nations',
    climateTrace: 'Independent verification of hidden or under-reported point sources',
    gcp: 'Gold-standard peer-reviewed Earth System science data'
  }
];
