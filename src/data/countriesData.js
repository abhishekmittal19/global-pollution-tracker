/**
 * Country-level environmental intelligence datasets.
 * Includes verified data for India, Germany, China, and key comparative global economies.
 * Sources: EDGAR v8.0, UNFCCC National Communications, IEA, World Bank, WHO, Global Carbon Project.
 */

export const COUNTRIES = [
  {
    id: 'india',
    name: 'India',
    iso3: 'IND',
    flag: '🇮🇳',
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 1428627663,
    gdpPerCapita: 2411, // USD (nominal)
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'India is the world\'s third-largest greenhouse-gas emitter in absolute terms, but maintains one of the lowest per-capita emission rates among major economies (~2.0 t CO₂/person). Its energy transition balances rapid industrialization and poverty alleviation with aggressive solar and non-fossil capacity expansion.',
    
    // Core Indicators
    indicators: {
      totalEmissionsCO2: 2830, // Mt CO2 (fossil + industrial)
      totalGHG: 3950, // Mt CO2eq (IPCC AR5 GWP-100)
      perCapitaCO2: 1.98, // t CO2/person
      perCapitaGHG: 2.76, // t CO2eq/person
      consumptionBasedCO2: 2680, // Mt CO2 (trade-adjusted, net exporter of embodied carbon)
      renewableShare: 22.4, // % of total electricity generation (solar, wind, large hydro, bio)
      installedNonFossilCapacity: 44.1, // % of total installed power capacity
      airQualityPM25: 53.3, // µg/m³ population-weighted annual mean
      carbonIntensity: 628, // g CO2/kWh of grid electricity
      forestCoverShare: 24.6, // % of total geographic land area
      baselineYear: 2005,
      netZeroTargetYear: 2070,
    },

    // Target framework
    ndcSnapshot: {
      targetStatement: 'Reduce Emissions Intensity of GDP by 45% by 2030 from 2005 levels; achieve 50% cumulative electric power installed capacity from non-fossil fuel-based energy resources by 2030.',
      status: 'Updated NDC submitted to UNFCCC (August 2022)',
      targetYear: 2030,
      baseYear: 2005,
      intensityTarget: '-45% GDP Intensity',
      netZeroYear: 2070,
      classification: 'Intensity-based NDC target with non-fossil capacity mandate'
    },

    // Sector breakdown (Percentage of total GHG emissions in latest inventory)
    sectorBreakdown: [
      { sector: 'Energy & Power Generation', share: 44.2, emissionsMt: 1745.9, color: '#1A5B47' },
      { sector: 'Industry & Manufacturing', share: 22.6, emissionsMt: 892.7, color: '#2E8B6E' },
      { sector: 'Agriculture & Livestock', share: 18.5, emissionsMt: 730.8, color: '#D97706' },
      { sector: 'Transport', share: 9.7, emissionsMt: 383.1, color: '#2563EB' },
      { sector: 'Buildings & Residential', share: 3.1, emissionsMt: 122.5, color: '#9333EA' },
      { sector: 'Waste Management', share: 1.9, emissionsMt: 75.0, color: '#64748B' }
    ],

    // Historical emissions timeline (1990 - 2023)
    historicalTimeline: [
      { year: 1990, co2: 580, ghg: 1210, perCapitaCO2: 0.67, renewableShare: 25.1 },
      { year: 1995, co2: 780, ghg: 1480, perCapitaCO2: 0.81, renewableShare: 21.3 },
      { year: 2000, co2: 980, ghg: 1720, perCapitaCO2: 0.93, renewableShare: 16.5 },
      { year: 2005, co2: 1210, ghg: 2050, perCapitaCO2: 1.05, renewableShare: 17.8 },
      { year: 2010, co2: 1680, ghg: 2620, perCapitaCO2: 1.36, renewableShare: 16.9 },
      { year: 2015, co2: 2270, ghg: 3260, perCapitaCO2: 1.72, renewableShare: 16.2 },
      { year: 2018, co2: 2600, ghg: 3670, perCapitaCO2: 1.91, renewableShare: 18.4 },
      { year: 2020, co2: 2440, ghg: 3510, perCapitaCO2: 1.76, renewableShare: 21.2 },
      { year: 2021, co2: 2650, ghg: 3740, perCapitaCO2: 1.89, renewableShare: 21.6 },
      { year: 2022, co2: 2790, ghg: 3880, perCapitaCO2: 1.96, renewableShare: 22.1 },
      { year: 2023, co2: 2830, ghg: 3950, perCapitaCO2: 1.98, renewableShare: 22.4 }
    ],

    methodologyNotes: {
      accountingStandard: 'UNFCCC 2006 IPCC Guidelines for National Greenhouse Gas Inventories (Tier 1 & Tier 2)',
      scope: 'Territorial emissions covering mainland India and Andaman & Nicobar, Lakshadweep islands.',
      gwpReference: 'IPCC Fifth Assessment Report (AR5) 100-year Global Warming Potentials.',
      consumptionAdjustment: 'Net exporter of embodied emissions: territorial emissions exceed consumption emissions by ~5.3% due to energy-intensive commodity manufacturing.',
      knownLimitations: 'Agricultural methane from enteric fermentation carries a ±25% statistical uncertainty range. Ground-level air monitoring density is significantly higher in urban centers than rural areas.'
    },

    sources: [
      { name: 'Ministry of Environment, Forest and Climate Change (MoEFCC)', title: 'India: Third National Communication to the UNFCCC', year: 2023, url: 'https://unfccc.int' },
      { name: 'Central Electricity Authority (CEA)', title: 'National Electricity Plan: Generation Vol I', year: 2023, url: 'https://cea.nic.in' },
      { name: 'European Commission EDGAR Database', title: 'GHG emissions of all world countries v8.0', year: 2023, url: 'https://edgar.jrc.ec.europa.eu' },
      { name: 'Global Carbon Project', title: 'Global Carbon Budget 2023', year: 2023, url: 'https://globalcarbonproject.org' }
    ]
  },

  {
    id: 'germany',
    name: 'Germany',
    iso3: 'DEU',
    flag: '🇩🇪',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 84482267,
    gdpPerCapita: 48718, // USD
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'Germany has reduced territorial emissions by ~46% compared to its 1990 baseline, powered by its Energiewende transition and renewable power expansion exceeding 52% of gross electricity in 2023. Key challenges remain in heating sector decarbonization, industrial transformation, and transport sector compliance.',

    indicators: {
      totalEmissionsCO2: 628, // Mt CO2
      totalGHG: 674, // Mt CO2eq
      perCapitaCO2: 7.43, // t CO2/person
      perCapitaGHG: 7.98, // t CO2eq/person
      consumptionBasedCO2: 735, // Mt CO2 (net importer of embodied carbon)
      renewableShare: 52.8, // % of gross electricity consumption
      installedNonFossilCapacity: 64.2,
      airQualityPM25: 10.2, // µg/m³
      carbonIntensity: 380, // g CO2/kWh
      forestCoverShare: 32.7,
      baselineYear: 1990,
      netZeroTargetYear: 2045,
    },

    ndcSnapshot: {
      targetStatement: 'Cut greenhouse gas emissions by 65% by 2030 compared to 1990 levels, 88% by 2040, and achieve net greenhouse-gas neutrality by 2045.',
      status: 'Codified in Federal Climate Change Act (Bundes-Klimaschutzgesetz 2021)',
      targetYear: 2030,
      baseYear: 1990,
      intensityTarget: '-65% Absolute GHG reduction',
      netZeroYear: 2045,
      classification: 'Legally binding absolute multi-sector emissions cap'
    },

    sectorBreakdown: [
      { sector: 'Energy & Power Generation', share: 30.4, emissionsMt: 204.9, color: '#1A5B47' },
      { sector: 'Industry & Manufacturing', share: 23.0, emissionsMt: 155.0, color: '#2E8B6E' },
      { sector: 'Transport', share: 21.5, emissionsMt: 144.9, color: '#2563EB' },
      { sector: 'Buildings & Heating', share: 15.1, emissionsMt: 101.8, color: '#9333EA' },
      { sector: 'Agriculture & Livestock', share: 8.9, emissionsMt: 60.0, color: '#D97706' },
      { sector: 'Waste Management', share: 1.1, emissionsMt: 7.4, color: '#64748B' }
    ],

    historicalTimeline: [
      { year: 1990, co2: 1050, ghg: 1251, perCapitaCO2: 13.25, renewableShare: 3.6 },
      { year: 1995, co2: 940, ghg: 1120, perCapitaCO2: 11.51, renewableShare: 4.8 },
      { year: 2000, co2: 890, ghg: 1045, perCapitaCO2: 10.82, renewableShare: 6.3 },
      { year: 2005, co2: 865, ghg: 993, perCapitaCO2: 10.51, renewableShare: 10.2 },
      { year: 2010, co2: 830, ghg: 942, perCapitaCO2: 10.15, renewableShare: 17.0 },
      { year: 2015, co2: 795, ghg: 902, perCapitaCO2: 9.68, renewableShare: 31.5 },
      { year: 2018, co2: 755, ghg: 855, perCapitaCO2: 9.11, renewableShare: 37.8 },
      { year: 2020, co2: 644, ghg: 729, perCapitaCO2: 7.74, renewableShare: 45.3 },
      { year: 2021, co2: 675, ghg: 760, perCapitaCO2: 8.11, renewableShare: 41.1 },
      { year: 2022, co2: 665, ghg: 746, perCapitaCO2: 7.92, renewableShare: 46.2 },
      { year: 2023, co2: 628, ghg: 674, perCapitaCO2: 7.43, renewableShare: 52.8 }
    ],

    methodologyNotes: {
      accountingStandard: 'UNFCCC National Inventory Report (NIR) & EU Effort Sharing Regulation / EU ETS MRV',
      scope: 'Territorial boundaries of the Federal Republic of Germany.',
      gwpReference: 'IPCC Fifth Assessment Report (AR5) GWP-100 values as mandated by Decision 18/CMA.1.',
      consumptionAdjustment: 'Net importer of embodied emissions: German consumption-based emissions are approximately ~17% higher than territorial emissions.',
      knownLimitations: 'Transport emissions do not currently include international aviation and maritime bunkers pursuant to standard UNFCCC guidelines.'
    },

    sources: [
      { name: 'Umweltbundesamt (UBA)', title: 'Treibhausgas-Emissionen in Deutschland 2023 (Preliminary NIR)', year: 2024, url: 'https://www.umweltbundesamt.de' },
      { name: 'Fraunhofer Institute for Solar Energy Systems (ISE)', title: 'Public Net Electricity Generation in Germany', year: 2023, url: 'https://energy-charts.info' },
      { name: 'Federal Ministry for Economic Affairs and Climate Action (BMWK)', title: 'Climate Action Report 2023', year: 2023, url: 'https://www.bmwk.de' }
    ]
  },

  {
    id: 'china',
    name: 'China',
    iso3: 'CHN',
    flag: '🇨🇳',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 1411750000,
    gdpPerCapita: 12720, // USD
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'China is the largest producer of greenhouse gases globally, responsible for approximately 31% of worldwide territorial CO₂. Concurrently, China builds and installs more solar, wind, and battery capacity annually than the rest of the world combined, under its "1+N" dual carbon targets framework.',

    indicators: {
      totalEmissionsCO2: 12600, // Mt CO2
      totalGHG: 15680, // Mt CO2eq
      perCapitaCO2: 8.92, // t CO2/person
      perCapitaGHG: 11.11, // t CO2eq/person
      consumptionBasedCO2: 11350, // Mt CO2 (net exporter of embodied carbon)
      renewableShare: 31.8, // % of total electricity generation
      installedNonFossilCapacity: 50.9,
      airQualityPM25: 30.6, // µg/m³ annual mean
      carbonIntensity: 540, // g CO2/kWh
      forestCoverShare: 24.1,
      baselineYear: 2005,
      netZeroTargetYear: 2060,
    },

    ndcSnapshot: {
      targetStatement: 'Aim to have CO₂ emissions peak before 2030 and achieve carbon neutrality before 2060; lower CO₂ emissions per unit of GDP by over 65% from 2005 levels by 2030; increase the share of non-fossil fuels in primary energy consumption to around 25%.',
      status: 'Updated NDC submitted to UNFCCC (October 2021)',
      targetYear: 2030,
      baseYear: 2005,
      intensityTarget: '>65% GDP Intensity Cut',
      netZeroYear: 2060,
      classification: 'Peak & Decline dual carbon roadmap ("30·60 Target")'
    },

    sectorBreakdown: [
      { sector: 'Energy & Power Generation', share: 48.1, emissionsMt: 7542.1, color: '#1A5B47' },
      { sector: 'Industry & Heavy Manufacturing', share: 31.5, emissionsMt: 4939.2, color: '#2E8B6E' },
      { sector: 'Transport', share: 8.4, emissionsMt: 1317.1, color: '#2563EB' },
      { sector: 'Buildings & Construction', share: 5.2, emissionsMt: 815.4, color: '#9333EA' },
      { sector: 'Agriculture & Land Use', share: 5.1, emissionsMt: 799.7, color: '#D97706' },
      { sector: 'Waste Management', share: 1.7, emissionsMt: 266.5, color: '#64748B' }
    ],

    historicalTimeline: [
      { year: 1990, co2: 2420, ghg: 3880, perCapitaCO2: 2.13, renewableShare: 20.4 },
      { year: 1995, co2: 3410, ghg: 4920, perCapitaCO2: 2.82, renewableShare: 18.2 },
      { year: 2000, co2: 3650, ghg: 5240, perCapitaCO2: 2.89, renewableShare: 16.7 },
      { year: 2005, co2: 5900, ghg: 7850, perCapitaCO2: 4.52, renewableShare: 15.9 },
      { year: 2010, co2: 8850, ghg: 11150, perCapitaCO2: 6.61, renewableShare: 18.7 },
      { year: 2015, co2: 9980, ghg: 12690, perCapitaCO2: 7.24, renewableShare: 23.8 },
      { year: 2018, co2: 10850, ghg: 13800, perCapitaCO2: 7.73, renewableShare: 26.7 },
      { year: 2020, co2: 11680, ghg: 14720, perCapitaCO2: 8.28, renewableShare: 28.2 },
      { year: 2021, co2: 12150, ghg: 15210, perCapitaCO2: 8.60, renewableShare: 29.4 },
      { year: 2022, co2: 12380, ghg: 15440, perCapitaCO2: 8.77, renewableShare: 30.8 },
      { year: 2023, co2: 12600, ghg: 15680, perCapitaCO2: 8.92, renewableShare: 31.8 }
    ],

    methodologyNotes: {
      accountingStandard: 'Ministry of Ecology and Environment (MEE) National GHG Inventory guidelines & IPCC 2006 guidelines.',
      scope: 'Mainland China (Hong Kong and Macao reported under distinct regional arrangements in UNFCCC).',
      gwpReference: 'IPCC AR5 GWP-100 metric.',
      consumptionAdjustment: 'Net exporter of embodied emissions: Chinese manufacturing exports account for approx ~9.9% of territorial emissions embedded in exported finished goods.',
      knownLimitations: 'Provincial coal consumption statistical revisions historically lead to ±5% adjustments in national carbon totals between preliminary and finalized datasets.'
    },

    sources: [
      { name: 'Ministry of Ecology and Environment (MEE)', title: 'Annual Report on China\'s Policies and Actions for Addressing Climate Change', year: 2023, url: 'https://english.mee.gov.cn' },
      { name: 'National Bureau of Statistics of China (NBS)', title: 'Statistical Communiqué of Economic and Social Development', year: 2023, url: 'http://www.stats.gov.cn' },
      { name: 'Center for Research on Energy and Clean Air (CREA)', title: 'China Clean Energy Transition and Emissions Report', year: 2023, url: 'https://energyandcleanair.org' }
    ]
  },

  {
    id: 'usa',
    name: 'United States',
    iso3: 'USA',
    flag: '🇺🇸',
    region: 'North America',
    subregion: 'Northern America',
    population: 334914895,
    gdpPerCapita: 76329,
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'The United States is the largest historical cumulative emitter of CO₂. While territorial emissions have declined ~17% since peak in 2007, per-capita emissions remain high at ~14.3 t CO₂/person.',
    indicators: {
      totalEmissionsCO2: 4800,
      totalGHG: 6100,
      perCapitaCO2: 14.33,
      perCapitaGHG: 18.21,
      consumptionBasedCO2: 5210,
      renewableShare: 23.4,
      installedNonFossilCapacity: 41.5,
      airQualityPM25: 8.9,
      carbonIntensity: 375,
      forestCoverShare: 33.9,
      baselineYear: 2005,
      netZeroTargetYear: 2050,
    },
    ndcSnapshot: {
      targetStatement: 'Reduce net greenhouse gas emissions by 50-52% below 2005 levels in 2030, achieve 100% carbon pollution-free electricity by 2035, and net-zero greenhouse gas emissions no later than 2050.',
      status: 'Updated NDC submitted to UNFCCC (April 2021)',
      targetYear: 2030,
      baseYear: 2005,
      intensityTarget: '-50% to -52% Net GHG reduction',
      netZeroYear: 2050,
      classification: 'Economy-wide absolute net GHG reduction target'
    },
    sectorBreakdown: [
      { sector: 'Transport', share: 28.5, emissionsMt: 1738.5, color: '#2563EB' },
      { sector: 'Energy & Power Generation', share: 25.1, emissionsMt: 1531.1, color: '#1A5B47' },
      { sector: 'Industry & Manufacturing', share: 22.9, emissionsMt: 1396.9, color: '#2E8B6E' },
      { sector: 'Buildings & Commercial', share: 13.2, emissionsMt: 805.2, color: '#9333EA' },
      { sector: 'Agriculture & Land Use', share: 10.3, emissionsMt: 628.3, color: '#D97706' }
    ],
    historicalTimeline: [
      { year: 1990, co2: 5120, ghg: 6440, perCapitaCO2: 20.3, renewableShare: 11.2 },
      { year: 2000, co2: 6010, ghg: 7420, perCapitaCO2: 21.3, renewableShare: 9.3 },
      { year: 2005, co2: 6130, ghg: 7450, perCapitaCO2: 20.8, renewableShare: 8.8 },
      { year: 2010, co2: 5690, ghg: 6980, perCapitaCO2: 18.4, renewableShare: 10.3 },
      { year: 2015, co2: 5250, ghg: 6590, perCapitaCO2: 16.3, renewableShare: 13.7 },
      { year: 2020, co2: 4570, ghg: 5980, perCapitaCO2: 13.8, renewableShare: 20.6 },
      { year: 2023, co2: 4800, ghg: 6100, perCapitaCO2: 14.3, renewableShare: 23.4 }
    ],
    methodologyNotes: {
      accountingStandard: 'EPA Inventory of U.S. Greenhouse Gas Emissions and Sinks (IPCC guidelines)',
      scope: 'Territorial 50 states plus Puerto Rico and overseas territories.',
      gwpReference: 'IPCC AR5 GWP-100 metric.',
      consumptionAdjustment: 'Net importer of embodied emissions (~8.5% above territorial).',
      knownLimitations: 'Fugitive methane emissions from unconventional oil and gas hydraulic fracturing carry uncertainty.'
    },
    sources: [
      { name: 'U.S. Environmental Protection Agency (EPA)', title: 'Inventory of U.S. Greenhouse Gas Emissions and Sinks 1990-2022', year: 2024, url: 'https://www.epa.gov' }
    ]
  },

  {
    id: 'japan',
    name: 'Japan',
    iso3: 'JPN',
    flag: '🇯🇵',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 124516650,
    gdpPerCapita: 34140,
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'Japan has achieved ten consecutive years of emissions reductions, targeting a 46% reduction by 2030 through nuclear restarts, offshore wind, and hydrogen blending.',
    indicators: {
      totalEmissionsCO2: 1020,
      totalGHG: 1120,
      perCapitaCO2: 8.19,
      perCapitaGHG: 8.99,
      consumptionBasedCO2: 1140,
      renewableShare: 22.8,
      installedNonFossilCapacity: 35.1,
      airQualityPM25: 9.1,
      carbonIntensity: 430,
      forestCoverShare: 68.4,
      baselineYear: 2013,
      netZeroTargetYear: 2050,
    },
    ndcSnapshot: {
      targetStatement: 'Aim to reduce greenhouse gas emissions by 46% in fiscal year 2030 from fiscal year 2013 levels, continuing efforts toward 50%, and achieve net zero by 2050.',
      status: 'Updated NDC submitted to UNFCCC (October 2021)',
      targetYear: 2030,
      baseYear: 2013,
      intensityTarget: '-46% Absolute GHG cut',
      netZeroYear: 2050,
      classification: 'Absolute economy-wide emissions cap'
    },
    sectorBreakdown: [
      { sector: 'Energy & Power Generation', share: 40.2, emissionsMt: 450.2, color: '#1A5B47' },
      { sector: 'Industry & Manufacturing', share: 27.3, emissionsMt: 305.8, color: '#2E8B6E' },
      { sector: 'Transport', share: 17.5, emissionsMt: 196.0, color: '#2563EB' },
      { sector: 'Commercial & Residential', share: 11.2, emissionsMt: 125.4, color: '#9333EA' },
      { sector: 'Agriculture & Waste', share: 3.8, emissionsMt: 42.6, color: '#D97706' }
    ],
    historicalTimeline: [
      { year: 1990, co2: 1150, ghg: 1270, perCapitaCO2: 9.31, renewableShare: 11.5 },
      { year: 2000, co2: 1240, ghg: 1350, perCapitaCO2: 9.77, renewableShare: 10.8 },
      { year: 2013, co2: 1310, ghg: 1410, perCapitaCO2: 10.29, renewableShare: 12.1 },
      { year: 2018, co2: 1140, ghg: 1240, perCapitaCO2: 9.01, renewableShare: 17.4 },
      { year: 2021, co2: 1060, ghg: 1170, perCapitaCO2: 8.44, renewableShare: 21.0 },
      { year: 2023, co2: 1020, ghg: 1120, perCapitaCO2: 8.19, renewableShare: 22.8 }
    ],
    methodologyNotes: {
      accountingStandard: 'Ministry of the Environment Japan & Greenhouse Gas Inventory Office (GIO)',
      scope: 'Territory of Japan.',
      gwpReference: 'IPCC AR5 GWP-100.',
      consumptionAdjustment: 'Net importer of embodied carbon (~11.7% higher than territorial).',
      knownLimitations: 'Nuclear restart cadence heavily impacts year-over-year fossil thermal generation changes.'
    },
    sources: [
      { name: 'Ministry of the Environment Japan (MOEJ)', title: 'National Greenhouse Gas Inventory Report of Japan', year: 2024, url: 'https://www.env.go.jp' }
    ]
  },

  {
    id: 'brazil',
    name: 'Brazil',
    iso3: 'BRA',
    flag: '🇧🇷',
    region: 'Latin America & Caribbean',
    subregion: 'South America',
    population: 216422446,
    gdpPerCapita: 8917,
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'Brazil presents a unique emissions profile: fossil energy emissions are low due to an 88% renewable power grid, while deforestation (LULUCF) in the Amazon and agriculture account for >70% of total national GHGs.',
    indicators: {
      totalEmissionsCO2: 460, // fossil only
      totalGHG: 1320, // including LULUCF & Agriculture methane
      perCapitaCO2: 2.12,
      perCapitaGHG: 6.10,
      consumptionBasedCO2: 485,
      renewableShare: 88.5, // Hydro, wind, biomass, solar
      installedNonFossilCapacity: 84.0,
      airQualityPM25: 12.8,
      carbonIntensity: 95, // extremely clean power grid
      forestCoverShare: 59.4,
      baselineYear: 2005,
      netZeroTargetYear: 2050,
    },
    ndcSnapshot: {
      targetStatement: 'Reduce net greenhouse gas emissions by 53.1% in 2030 compared to 2005, and eliminate illegal deforestation in the Brazilian Amazon by 2030; net-zero emissions by 2050.',
      status: 'Updated NDC submitted to UNFCCC (November 2023)',
      targetYear: 2030,
      baseYear: 2005,
      intensityTarget: '-53.1% Net GHG cut',
      netZeroYear: 2050,
      classification: 'Absolute economy-wide target with anti-deforestation focus'
    },
    sectorBreakdown: [
      { sector: 'Land-Use Change & Forestry (LULUCF)', share: 48.0, emissionsMt: 633.6, color: '#D97706' },
      { sector: 'Agriculture & Cattle Livestock', share: 27.2, emissionsMt: 359.0, color: '#B45309' },
      { sector: 'Energy & Power Generation', share: 18.1, emissionsMt: 238.9, color: '#1A5B47' },
      { sector: 'Industry & Waste', share: 6.7, emissionsMt: 88.5, color: '#2E8B6E' }
    ],
    historicalTimeline: [
      { year: 1990, co2: 210, ghg: 1390, perCapitaCO2: 1.39, renewableShare: 92.5 },
      { year: 2000, co2: 330, ghg: 1720, perCapitaCO2: 1.88, renewableShare: 88.0 },
      { year: 2005, co2: 380, ghg: 2100, perCapitaCO2: 2.04, renewableShare: 85.3 },
      { year: 2015, co2: 500, ghg: 1380, perCapitaCO2: 2.44, renewableShare: 75.5 },
      { year: 2020, co2: 440, ghg: 1290, perCapitaCO2: 2.06, renewableShare: 84.8 },
      { year: 2023, co2: 460, ghg: 1320, perCapitaCO2: 2.12, renewableShare: 88.5 }
    ],
    methodologyNotes: {
      accountingStandard: 'SEEG (System of Greenhouse Gas Emission and Removal Estimates) & MCTI',
      scope: 'National territory of Brazil, emphasizing Amazon and Cerrado biomes.',
      gwpReference: 'IPCC AR5 GWP-100 metric.',
      consumptionAdjustment: 'Close to parity on trade-adjusted fossil carbon.',
      knownLimitations: 'Satellite-derived deforestation estimates (PRODES/DETER) vary from inventory carbon pool accounting.'
    },
    sources: [
      { name: 'Ministry of Science, Technology and Innovation (MCTI)', title: 'Fourth National Communication to the UNFCCC', year: 2021, url: 'https://unfccc.int' },
      { name: 'SEEG / Observatório do Clima', title: 'Estimates of Greenhouse Gas Emissions in Brazil', year: 2023, url: 'https://seeg.eco.br' }
    ]
  },

  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    iso3: 'GBR',
    flag: '🇬🇧',
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67736802,
    gdpPerCapita: 46125,
    latestReportingYear: 2023,
    verificationStatus: 'VERIFIED',
    summary: 'The UK has achieved a ~50% drop in territorial emissions since 1990, largely driven by the near-complete phaseout of coal power and expansion of North Sea offshore wind.',
    indicators: {
      totalEmissionsCO2: 320,
      totalGHG: 384,
      perCapitaCO2: 4.72,
      perCapitaGHG: 5.67,
      consumptionBasedCO2: 445,
      renewableShare: 48.2,
      installedNonFossilCapacity: 59.8,
      airQualityPM25: 8.4,
      carbonIntensity: 148,
      forestCoverShare: 13.2,
      baselineYear: 1990,
      netZeroTargetYear: 2050,
    },
    ndcSnapshot: {
      targetStatement: 'Reduce economy-wide greenhouse gas emissions by at least 68% by 2030 compared to 1990 levels, and achieve Net Zero by 2050.',
      status: 'Updated NDC submitted to UNFCCC (September 2022)',
      targetYear: 2030,
      baseYear: 1990,
      intensityTarget: '-68% Absolute GHG cut',
      netZeroYear: 2050,
      classification: 'Statutory 5-year carbon budget framework (Climate Change Act 2008)'
    },
    sectorBreakdown: [
      { sector: 'Transport', share: 29.1, emissionsMt: 111.7, color: '#2563EB' },
      { sector: 'Buildings & Heating', share: 20.3, emissionsMt: 78.0, color: '#9333EA' },
      { sector: 'Energy & Power Generation', share: 19.8, emissionsMt: 76.0, color: '#1A5B47' },
      { sector: 'Industry & Manufacturing', share: 13.9, emissionsMt: 53.4, color: '#2E8B6E' },
      { sector: 'Agriculture & Waste', share: 16.9, emissionsMt: 64.9, color: '#D97706' }
    ],
    historicalTimeline: [
      { year: 1990, co2: 600, ghg: 795, perCapitaCO2: 10.49, renewableShare: 2.1 },
      { year: 2000, co2: 560, ghg: 708, perCapitaCO2: 9.51, renewableShare: 2.8 },
      { year: 2010, co2: 505, ghg: 602, perCapitaCO2: 8.04, renewableShare: 6.9 },
      { year: 2015, co2: 415, ghg: 501, perCapitaCO2: 6.37, renewableShare: 24.6 },
      { year: 2020, co2: 330, ghg: 405, perCapitaCO2: 4.92, renewableShare: 43.1 },
      { year: 2023, co2: 320, ghg: 384, perCapitaCO2: 4.72, renewableShare: 48.2 }
    ],
    methodologyNotes: {
      accountingStandard: 'Department for Energy Security and Net Zero (DESNZ) / Climate Change Committee (CCC)',
      scope: 'UK territorial emissions plus Crown Dependencies and Overseas Territories (under separate reporting).',
      gwpReference: 'IPCC AR5 GWP-100.',
      consumptionAdjustment: 'Net importer of embodied emissions: UK consumption footprint is ~39% higher than territorial emissions.',
      knownLimitations: 'De-industrialization effect: part of domestic emission reductions reflects offshore manufacturing migration.'
    },
    sources: [
      { name: 'Department for Energy Security and Net Zero (DESNZ)', title: '2023 UK Greenhouse Gas Emissions, Final Figures', year: 2024, url: 'https://www.gov.uk' }
    ]
  }
];
