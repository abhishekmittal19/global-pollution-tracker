/**
 * Verified Directory of Environmental Organizations, Research Institutes, and Key Research Groups.
 * Contains authentic institutional profiles, mandate descriptions, and links.
 */

export const ORGANIZATIONS = [
  // INDIA
  {
    id: 'moefcc-india',
    name: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
    type: 'Government Agency',
    countryId: 'india',
    countryName: 'India',
    countryFlag: '🇮🇳',
    headquarters: 'Indira Paryavaran Bhawan, New Delhi, India',
    areaOfWork: 'National Environmental Policy, Climate Negotiations, Forestry & Biodiversity',
    description: 'The nodal agency in the administrative structure of the Central Government for planning, promotion, coordination, and overseeing the implementation of India\'s environmental and forestry policies.',
    keyProjects: [
      'National Action Plan on Climate Change (NAPCC)',
      'National Clean Air Programme (NCAP)',
      'UNFCCC Biennial Update Reports & National Communications',
      'Mission LiFE (Lifestyle for Environment)'
    ],
    officialUrl: 'https://moef.gov.in',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'teri-india',
    name: 'The Energy and Resources Institute (TERI)',
    type: 'Research Institute',
    countryId: 'india',
    countryName: 'India',
    countryFlag: '🇮🇳',
    headquarters: 'Darbari Seth Block, IHC, Lodhi Road, New Delhi, India',
    areaOfWork: 'Energy Transition, Industrial Decarbonization, Climate Modeling, Sustainable Habitat',
    description: 'Independent research institution conducting policy research and technological solutions in energy, environment, and sustainable development.',
    keyProjects: [
      'World Sustainable Development Summit (WSDS)',
      'Decarbonizing Indian Industry Pathways (Steel, Cement)',
      'Solar Rooftop Diagnostic Assessment Frameworks'
    ],
    officialUrl: 'https://www.teriin.org',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'cpcb-india',
    name: 'Central Pollution Control Board (CPCB)',
    type: 'Government Agency',
    countryId: 'india',
    countryName: 'India',
    countryFlag: '🇮🇳',
    headquarters: 'Parivesh Bhawan, East Arjun Nagar, Delhi, India',
    areaOfWork: 'Air Quality Standards, Water Pollution Monitoring, Environmental Enforcement',
    description: 'Statutory organization under the Water (Prevention and Control of Pollution) Act 1974, managing national ambient air quality monitoring networks (CAAQMS).',
    keyProjects: [
      'National Air Quality Monitoring Programme (NAMP)',
      'PRANA Portal (Portal for Regulation of Air-pollution in Non-Attainment cities)',
      'Continuous Emission Monitoring Systems (CEMS) Mandate'
    ],
    officialUrl: 'https://cpcb.nic.in',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'cstep-india',
    name: 'Center for Study of Science, Technology and Policy (CSTEP)',
    type: 'Research Institute',
    countryId: 'india',
    countryName: 'India',
    countryFlag: '🇮🇳',
    headquarters: 'Bengaluru, Karnataka, India',
    areaOfWork: 'Renewable Integration, Air Quality Modeling, Urban Clean Energy',
    description: 'One of South Asia\'s premier policy research think tanks focusing on technology applications in climate change and energy security.',
    keyProjects: [
      'Clean Air Action Plans for Non-Attainment Cities',
      'Solar Rooftop Potential Tool (CREST)',
      'Low Carbon Pathways for Indian States'
    ],
    officialUrl: 'https://cstep.in',
    verificationStatus: 'VERIFIED'
  },

  // GERMANY
  {
    id: 'uba-germany',
    name: 'Federal Environment Agency (Umweltbundesamt - UBA)',
    type: 'Government Agency',
    countryId: 'germany',
    countryName: 'Germany',
    countryFlag: '🇩🇪',
    headquarters: 'Wörlitzer Platz 1, Dessau-Roßlau, Germany',
    areaOfWork: 'National Emissions Inventory, Environmental Health, Circular Economy, Climate Regulations',
    description: 'Germany\'s central environmental protection authority, responsible for compiling the official National Greenhouse Gas Inventory and advising the Federal Government on environmental legislation.',
    keyProjects: [
      'German National Inventory Report (NIR) under UNFCCC',
      'Federal Climate Protection Act (KSG) Annual Emissions Audits',
      'European Emissions Trading System (DEHSt compliance)'
    ],
    officialUrl: 'https://www.umweltbundesamt.de',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'pik-germany',
    name: 'Potsdam Institute for Climate Impact Research (PIK)',
    type: 'University / Institute',
    countryId: 'germany',
    countryName: 'Germany',
    countryFlag: '🇩🇪',
    headquarters: 'Telegrafenberg, Potsdam, Germany',
    areaOfWork: 'Earth System Analysis, Planetary Boundaries, Climate Economics, Tipping Elements',
    description: 'Member of the Leibniz Association and world-renowned institute analyzing Earth system dynamics, climate risk scenarios, and pathways for sustainable socio-ecological development.',
    keyProjects: [
      'Planetary Boundaries Framework Updates',
      'REMIND Integrated Assessment Model',
      'Inter-Sectoral Impact Model Intercomparison Project (ISIMIP)'
    ],
    officialUrl: 'https://www.pik-potsdam.de',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'fraunhofer-ise',
    name: 'Fraunhofer Institute for Solar Energy Systems (ISE)',
    type: 'Research Institute',
    countryId: 'germany',
    countryName: 'Germany',
    countryFlag: '🇩🇪',
    headquarters: 'Heidenhofstraße 2, Freiburg im Breisgau, Germany',
    areaOfWork: 'Photovoltaics, Hydrogen Technologies, Grid Integration, Building Decarbonization',
    description: 'The largest solar research institute in Europe, pioneering high-efficiency solar cells, renewable power tracking, and power grid modeling.',
    keyProjects: [
      'Energy-Charts.info Public Electricity Generation Database',
      'Tandem Perovskite-Silicon Photovoltaic Cells',
      'Hydrogen Electrolyser Production Acceleration'
    ],
    officialUrl: 'https://www.ise.fraunhofer.de',
    verificationStatus: 'VERIFIED'
  },

  // CHINA
  {
    id: 'mee-china',
    name: 'Ministry of Ecology and Environment (MEE)',
    type: 'Government Agency',
    countryId: 'china',
    countryName: 'China',
    countryFlag: '🇨🇳',
    headquarters: 'Beijing, People\'s Republic of China',
    areaOfWork: 'Ecological Conservation, Atmospheric Pollution Control, National ETS Administration',
    description: 'State Council ministry overseeing ecological protection, national pollution abatement standards, international climate agreements, and operation of the National Carbon ETS.',
    keyProjects: [
      'National Carbon Emissions Trading Scheme Supervision',
      'Three-Year Action Plan for Winning the Blue Sky War',
      'Ecology and Environment Statistical Yearbook'
    ],
    officialUrl: 'https://english.mee.gov.cn',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'tsinghua-iccsd',
    name: 'Institute of Climate Change and Sustainable Development (ICCSD)',
    type: 'University / Institute',
    countryId: 'china',
    countryName: 'China',
    countryFlag: '🇨🇳',
    headquarters: 'Tsinghua University, Beijing, China',
    areaOfWork: 'Dual Carbon Strategy ("30·60"), Global Climate Governance, Energy Modeling',
    description: 'Tsinghua University think tank providing high-level technical modeling and strategic roadmaps for China\'s carbon peak and neutrality policies.',
    keyProjects: [
      'China\'s Long-Term Low-Carbon Development Strategy Pathways',
      'Global South Climate Cooperation Platform',
      'Tsinghua University Zero-Carbon Campus Initiative'
    ],
    officialUrl: 'http://iccsd.tsinghua.edu.cn',
    verificationStatus: 'VERIFIED'
  },

  // INTERNATIONAL BODIES
  {
    id: 'ipcc-global',
    name: 'Intergovernmental Panel on Climate Change (IPCC)',
    type: 'International Body',
    countryId: 'global',
    countryName: 'International',
    countryFlag: '🌐',
    headquarters: 'Geneva, Switzerland (WMO/UNEP)',
    areaOfWork: 'Comprehensive Scientific Assessments, Mitigation Pathways, Emission Guidelines',
    description: 'The United Nations body for assessing the science related to climate change, established in 1988 by UNEP and WMO to provide policymakers with regular scientific assessments.',
    keyProjects: [
      'Sixth Assessment Report (AR6 Synthesis & Working Groups I, II, III)',
      '2006 IPCC Guidelines for National Greenhouse Gas Inventories',
      'Special Report on Global Warming of 1.5°C (SR15)'
    ],
    officialUrl: 'https://www.ipcc.ch',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'iea-global',
    name: 'International Energy Agency (IEA)',
    type: 'International Body',
    countryId: 'global',
    countryName: 'International',
    countryFlag: '🌐',
    headquarters: 'Paris, France',
    areaOfWork: 'Global Energy Balances, Net Zero Pathways, Clean Energy Technology Tracking',
    description: 'Autonomous intergovernmental organization providing authoritative data, analysis, and policy recommendations on energy security and clean energy transitions.',
    keyProjects: [
      'Net Zero by 2050 Roadmap',
      'World Energy Outlook (WEO)',
      'Global Methane Tracker'
    ],
    officialUrl: 'https://www.iea.org',
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'gcp-global',
    name: 'Global Carbon Project (GCP)',
    type: 'Research Initiative',
    countryId: 'global',
    countryName: 'International',
    countryFlag: '🌐',
    headquarters: 'Future Earth / CSIRO, Canberra, Australia',
    areaOfWork: 'Global Carbon Budget, Methane Budget, Nitrous Oxide Budget, Trade Footprints',
    description: 'Global research project of Future Earth bringing together hundreds of Earth system scientists to quantify greenhouse-gas cycles and human emissions annually.',
    keyProjects: [
      'Global Carbon Budget (Annual release)',
      'Global Carbon Atlas Interactive Portal',
      'Regional Carbon Cycle Assessment and Processes (RECCAP)'
    ],
    officialUrl: 'https://www.globalcarbonproject.org',
    verificationStatus: 'VERIFIED'
  }
];
