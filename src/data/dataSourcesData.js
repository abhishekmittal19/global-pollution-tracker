/**
 * Transparent Environmental Data Sources Directory.
 * Complete provenance, license information, temporal coverage, and methodological notes.
 */

export const DATA_SOURCES = [
  {
    id: 'edgar-ghg',
    name: 'EDGAR (Emissions Database for Global Atmospheric Research)',
    publisher: 'European Commission Joint Research Centre (JRC)',
    category: 'Emissions & Pollution',
    geographicCoverage: 'Global (All 208 sovereign nations and territories)',
    timeCoverage: '1970 – 2023',
    updateFrequency: 'Annual (Autumn release cycle)',
    sourceUrl: 'https://edgar.jrc.ec.europa.eu',
    accessNotes: 'Open Data under Creative Commons Attribution 4.0 International (CC BY 4.0). Tabular Excel and NetCDF raster grids.',
    methodologyReference: 'Consistent bottom-up methodology applying IPCC tier-1 emission factors to international energy and agricultural activity statistics (IEA, FAO, USGS).',
    knownLimitations: 'Relies on international proxy datasets which may differ from customized national inventory tier-2/tier-3 calculations.'
  },
  {
    id: 'unfccc-registry',
    name: 'UNFCCC National Inventory Submissions & NDC Registry',
    publisher: 'United Nations Framework Convention on Climate Change (UNFCCC)',
    category: 'Climate Targets & Official Inventories',
    geographicCoverage: 'Parties to the UNFCCC & Paris Agreement (198 Parties)',
    timeCoverage: '1990 – present',
    updateFrequency: 'Annual for Annex I; biennial/periodic for non-Annex I parties',
    sourceUrl: 'https://unfccc.int/process-and-meetings/the-paris-agreement/nationally-determined-contributions-ndcs',
    accessNotes: 'Official United Nations public repository. Submissions filed as PDFs, Common Reporting Format (CRF) tables, and NIR documents.',
    methodologyReference: 'Mandated by IPCC Guidelines (1996 & 2006 versions) and CMA decisions governing transparency (Decision 18/CMA.1).',
    knownLimitations: 'Significant reporting time lag (up to 2 years for developed nations, longer for developing states); varying tier methodology between countries.'
  },
  {
    id: 'global-carbon-budget',
    name: 'Global Carbon Budget & Global Carbon Atlas',
    publisher: 'Global Carbon Project (GCP) / Copernicus / Future Earth',
    category: 'Emissions & Carbon Cycle',
    geographicCoverage: 'Global, regional, and national levels',
    timeCoverage: '1750 – 2023',
    updateFrequency: 'Annual peer-reviewed release in Earth System Science Data (ESSD)',
    sourceUrl: 'https://globalcarbonbudget.org',
    accessNotes: 'Open Access research data. Direct API and CSV export available via Global Carbon Atlas.',
    methodologyReference: 'Integrates fossil emission data from CDIAC/UN, cement statistics, atmospheric CO₂ measurements from Mauna Loa, and global ocean/land sink models.',
    knownLimitations: 'Land-use change flux (LUC) carries an uncertainty of approximately ±2.6 Gt CO₂/year globally.'
  },
  {
    id: 'iea-energy-emissions',
    name: 'IEA World Energy Balances & CO₂ Emissions from Fuel Combustion',
    publisher: 'International Energy Agency (IEA)',
    category: 'Energy & Power Emissions',
    geographicCoverage: '150+ countries and global aggregates',
    timeCoverage: '1971 – 2023',
    updateFrequency: 'Annual (with quarterly provisional estimates)',
    sourceUrl: 'https://www.iea.org/data-and-statistics',
    accessNotes: 'Key summary statistics open access; granular microdata requires institutional subscription.',
    methodologyReference: 'Energy balance tables converting physical quantities (tonnes of coal, barrels of oil) into energy units (PJ/Mtoe) with default IPCC carbon factors.',
    knownLimitations: 'Focuses primarily on fuel combustion emissions; does not quantify agricultural non-CO₂ gases or land-use change.'
  },
  {
    id: 'world-bank-wdi',
    name: 'World Bank World Development Indicators (Environment)',
    publisher: 'The World Bank Group',
    category: 'Socioeconomic & Environmental Indicators',
    geographicCoverage: '217 economies worldwide',
    timeCoverage: '1960 – present',
    updateFrequency: 'Quarterly updates to database indicators',
    sourceUrl: 'https://databank.worldbank.org/source/world-development-indicators',
    accessNotes: 'Open Data under CC BY-4.0. REST API available at api.worldbank.org.',
    methodologyReference: 'Aggregates official data from UN agencies, IEA, Carbon Dioxide Information Analysis Center (CDIAC), and national statistical offices.',
    knownLimitations: 'Harmonization introduces reporting lags; population revisions can cause slight retrospective adjustments in per-capita indicators.'
  },
  {
    id: 'who-air-quality',
    name: 'WHO Ambient Air Quality Database',
    publisher: 'World Health Organization (WHO), Department of Public Health',
    category: 'Air Quality & Health',
    geographicCoverage: '6,000+ cities in 117 countries',
    timeCoverage: '2010 – 2023',
    updateFrequency: 'Biennial major revisions',
    sourceUrl: 'https://www.who.int/data/gho/data/themes/air-pollution/who-ambient-air-quality-database',
    accessNotes: 'Open access via WHO Global Health Observatory (GHO).',
    methodologyReference: 'Compiles annual mean concentrations of PM10 and PM2.5 measured by official ground monitoring stations and national air quality bodies.',
    knownLimitations: 'Station placement bias (more monitors in wealthy urban neighborhoods); rural populations often unrepresented in ground measurements.'
  },
  {
    id: 'climate-trace',
    name: 'Climate TRACE Asset-Level Emissions Inventory',
    publisher: 'Climate TRACE Coalition',
    category: 'Emissions & Asset-Level Tracking',
    geographicCoverage: 'Global (350+ million individual source assets)',
    timeCoverage: '2015 – 2023',
    updateFrequency: 'Monthly / Quarterly updates',
    sourceUrl: 'https://climatetrace.org',
    accessNotes: 'Open Data. Interactive web map, downloadable CSV, and API.',
    methodologyReference: 'Direct satellite remote sensing (Sentinel, Landsat) combined with AI computer vision and activity algorithms for individual power plants, factories, and shipping.',
    knownLimitations: 'Modeled emissions where direct plume sensors are absent; satellite cloud cover can obstruct optical observations in monsoon or tropical zones.'
  }
];
