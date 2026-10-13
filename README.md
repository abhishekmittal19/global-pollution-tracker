# Global Pollution & Climate Intelligence (GPCI)

A modern, scientific, responsive environmental intelligence web platform designed to help students, researchers, policymakers, NGOs, and citizens explore and compare how countries address pollution and climate change.

Built with **React**, **Vite**, **Tailwind CSS**, **React Router**, **Recharts**, and **Lucide React**.

---

## 1. Vision & Core Philosophy

**Global Pollution & Climate Intelligence (GPCI)** establishes a centralized repository of country-level greenhouse gas emissions, environmental indicators, statutory climate schemes, and scientific measurement methodologies.

Key scientific tenets:
- **Territorial vs. Consumption-Based Accounting:** Clear separation between production-based emissions (occurring physically inside national borders) and consumption-based footprints (trade-adjusted for imported manufactured goods).
- **No Arbitrary Rankings or "Green Scores":** GPCI does not compute composite beauty-contest scores that mask trade-offs between economic development, historical emissions, and equity.
- **Transparent Provenance:** Every metric is attributed to its reporting year, measurement unit, primary publisher (UNFCCC, EDGAR, GCP, IEA), and documented methodological limitations.
- **Honest Missing Data:** Missing data is explicitly displayed as `— Not Reported` rather than misleading zeroes.

---

## 2. Technology Stack & Architecture

- **UI Framework:** React 18 with Vite
- **Language:** JavaScript & JSX (Clean, modern ES modules)
- **Styling:** Tailwind CSS with a scientific light theme (warm sand backgrounds `#FDFCF9`, dark forest green `#0D3328` / `#1A5B47`, and restrained elevation shadows)
- **Navigation:** React Router v6 (`react-router-dom`)
- **Data Visualization:** Recharts (responsive line charts, bar comparisons, and sector donut breakdowns)
- **Icons:** Lucide React
- **Architecture:** Decoupled service layer (`src/services/environmentalService.js`) prepared for direct REST integration with a Node.js / Express.js / MongoDB (MERN) backend.

---

## 3. Application Modules & Navigation

The platform features 9 core modules accessible via the responsive desktop sidebar and mobile navigation drawer:

1. **Global Overview Dashboard (`/`):**
   - Macro indicators: Global Greenhouse Gas Emissions (53.8 Gt CO₂eq), CO₂ per person (4.71 t CO₂), Global Renewable Share (30.2%), and Cataloged Economies.
   - Interactive timeline trajectory chart (1990–2023) with country toggles and metric switching.
   - Comparative country bar chart.
   - Featured country cards (India, Germany, China).
   - Thematic explore cards (Air pollution, GHG emissions, Renewables, Climate targets, Policies, Circular economy).
   - Peer-reviewed research publications spotlight (UNEP Emissions Gap, IEA Net Zero Roadmap, IPCC AR6).

2. **Country Explorer (`/countries`):**
   - Searchable, filterable directory with Grid View and Table View toggles.
   - Multi-attribute filters: Region, metric sorting (Total CO₂, Per-Capita CO₂, Renewables, PM2.5, Name), and search keywords.
   - Quick indicators on each card with direct links to individual profiles.

3. **Country Profile (`/countries/:id`):**
   - Deep-dive profile tabs:
     - **Overview:** Population, GDP per capita, key indicators, and Paris Agreement NDC snapshot.
     - **Emissions & Sectors:** Historical trendline and sector breakdown donut chart (Power, Industry, Transport, Buildings, Agriculture, Waste).
     - **Policies & Schemes:** Statutory acts with responsible ministries, objectives, targets, and outcome evidence.
     - **Targets & NDC Progress:** Official NDC statements, target year, baseline reference year, and net-zero year.
     - **Methodology & Boundaries:** Accounting standard, geographic scope, AR5 GWP conversion, and uncertainties.
     - **Sources & Citations:** Direct links to official government national communications and databases.

4. **Compare Countries (`/compare`):**
   - Select 2 to 4 countries side by side.
   - Multi-indicator comparison table across Demographics, Emissions Accounting, Energy & Air Quality, and Climate Commitments.
   - Aligned comparative charts over identical timelines and units.

5. **Pollution & Emissions (`/emissions`):**
   - Overview of major global emission sectors (Power, Heavy Industry, Transport, Agriculture, Buildings, Waste).
   - Country sector allocation diagnostic.
   - Atmospheric principles of GWP-100 conversion and scope boundaries.

6. **Policies & Schemes Explorer (`/policies`):**
   - Filter by Sector (Energy, Transport, Industry, Buildings, Air Quality, etc.), Country, Implementation Status, and Policy Type.
   - Detailed policy cards with expandable budget information and audited outcome evidence.
   - Core reminder: Policy quantity ≠ policy effectiveness.

7. **Methodologies (`/methodologies`):**
   - Scientific explainer of territorial vs consumption emissions, GWP weighting (CO₂, Methane, N₂O, F-gases), PM2.5 monitoring networks vs satellite AOD, and baseline year mechanics (1990 vs 2005).
   - Structured comparison matrix comparing UNFCCC official submissions, European Commission EDGAR, Climate TRACE, and Global Carbon Project.

8. **People & Organizations (`/organizations`):**
   - Verified directory of environmental ministries, research institutes (TERI, PIK, Fraunhofer ISE, Tsinghua ICCSD), and international bodies (IPCC, IEA, Global Carbon Project).
   - Direct links to official institutional portals.

9. **Data Sources (`/data-sources`):**
   - Complete provenance registry: EDGAR, UNFCCC NDC Registry, Global Carbon Budget, IEA Energy Balances, World Bank WDI, WHO Ambient Air Quality, and Climate TRACE.
   - Documentation of update frequency, license terms, and known limitations.

10. **About the Project (`/about`):**
    - Platform mission, architecture overview, MERN REST API specification, and data disclosure notes.

---

## 4. Installation & Running Instructions

### Prerequisites
- Node.js version 18+ (tested on Node v24.16.0)
- npm version 9+ (tested on npm 11.13.0)

### Installation
```bash
# Navigate to the project root directory
cd "d:\Global Pollution & Climate Intelligence"

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000` (or `http://localhost:5173`).

### Creating a Production Build
```bash
npm run build
```
Production assets are generated in `dist/` with optimized chunk splitting:
- `dist/assets/vendor-react-*.js` (React & React Router)
- `dist/assets/vendor-charts-*.js` (Recharts)
- `dist/assets/vendor-icons-*.js` (Lucide React)
- `dist/assets/index-*.js` (Application code)
- `dist/assets/index-*.css` (Tailwind CSS)

### Previewing the Production Build
```bash
npm run preview
```

---

## 5. Sample Data vs. Verified Real-World Data Disclosure

In compliance with scientific governance standards:

### Verified Real-World Data (100% Authentic Citations)
- **National Emissions & Indicators:** All data for **India**, **Germany**, **China**, **United States**, **Japan**, **Brazil**, and **United Kingdom** is sourced from:
  - European Commission EDGAR v8.0 Greenhouse Gas Database (2023)
  - UNFCCC National Inventory Submissions & First/Second/Third National Communications
  - Global Carbon Project (Global Carbon Budget 2023)
  - International Energy Agency (IEA) World Energy Balances
  - Central Electricity Authority (India) & Umweltbundesamt (Germany) & MEE (China)
- **Government Climate Policies:** All 13 indexed policies (e.g. India's National Solar Mission, PAT Scheme, FAME II; Germany's KSG Climate Act, EEG 2023, Coal Phase-out Act; China's National Carbon ETS, 1+N Framework, NEV Plan; US Inflation Reduction Act) represent real-world statutory acts with verified ministry links.
- **Organizations & Data Repositories:** All 12 institutions (MoEFCC, UBA, MEE, PIK, TERI, Tsinghua ICCSD, IPCC, IEA, etc.) are verified organizations.

### Illustrative Data (Clearly Labeled)
- Where preliminary 2023 estimates are subject to retrospective national inventory revision cycles (typically 12-24 months for UNFCCC Annex I), values are marked with appropriate verification metadata and notes.

---

## 6. MERN Backend Integration & API Specification

The frontend architecture separates data access from UI presentation. When ready to connect to a Node.js / Express.js / MongoDB backend:

1. Update `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_USE_LOCAL_DATA=false
   ```
2. The centralized API client (`src/services/api.js`) and service methods (`src/services/environmentalService.js`) will automatically make REST requests to the following Express endpoints:

| Method | Endpoint Path | Query Parameters | Description & Target MongoDB Model |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/overview` | None | Returns global aggregate metrics, featured countries, and topics. (`GlobalMetric` collection) |
| `GET` | `/api/countries` | `region`, `search`, `sortBy`, `sortOrder` | Returns paginated/filtered country directory. (`Country` collection) |
| `GET` | `/api/countries/:id` | None | Returns country profile by ID/ISO3 with indicators, sector allocations, and NDC. (`Country` collection) |
| `GET` | `/api/countries/:id/indicators` | None | Returns historical time-series ledger for charts. (`EmissionsSeries` collection) |
| `GET` | `/api/compare` | `ids` (comma-separated), `metric` | Aligns multiple countries over common timeline and returns comparison rows. |
| `GET` | `/api/policies` | `countryId`, `sector`, `status`, `type`, `search` | Returns filtered climate policy records. (`Policy` collection) |
| `GET` | `/api/methodologies` | `category`, `search` | Returns measurement frameworks and comparison matrix. (`Methodology` collection) |
| `GET` | `/api/organizations` | `type`, `countryId`, `search` | Returns verified institutions and researchers. (`Organization` collection) |
| `GET` | `/api/data-sources` | `category`, `search` | Returns data source catalog and provenance notes. (`DataSource` collection) |
| `GET` | `/api/search` | `q` | Universal search across countries, policies, methodologies, and organizations. |

---

## 7. Folder Structure

```
d:/Global Pollution & Climate Intelligence/
├── index.html                     # HTML Entry point with Google Fonts
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite bundler configuration & chunk splitting
├── tailwind.config.js             # Tailwind CSS theme & scientific palette
├── postcss.config.js              # PostCSS plugins
├── .env                           # Environment variables
├── .env.example                   # Example environment configuration
├── dist/                          # Production build output
└── src/
    ├── main.jsx                   # Application bootstrap
    ├── App.jsx                    # React Router configuration
    ├── styles/
    │   └── index.css              # Custom typography, scrollbars, focus states
    ├── utils/
    │   ├── constants.js           # Regions, sectors, indicator definitions, badges
    │   └── formatters.js          # Scientific number, unit, and missing data formatters
    ├── services/
    │   ├── api.js                 # Centralized API fetch client & error handling
    │   └── environmentalService.js# Service layer methods for REST & local data
    ├── data/
    │   ├── countriesData.js       # Verified country profiles (India, Germany, China, US, Japan, etc.)
    │   ├── policiesData.js        # Real-world climate policies & schemes
    │   ├── methodologiesData.js   # Accounting frameworks & comparison matrix
    │   ├── organizationsData.js   # Verified institutes, ministries, and global bodies
    │   ├── dataSourcesData.js     # Data source provenance catalog
    │   └── globalOverviewData.js  # Global metrics & research publications
    ├── components/
    │   ├── common/
    │   │   ├── Badge.jsx          # Status and sector badges
    │   │   ├── Button.jsx         # Accessible button variants
    │   │   ├── DataQualityNotice.jsx # Scientific caveats & governance callouts
    │   │   ├── EmptyState.jsx     # Helpful zero-result states
    │   │   ├── LoadingSpinner.jsx # Accessible loading indicator
    │   │   ├── Tabs.jsx           # Accessible navigation tabs
    │   │   └── ExportModal.jsx    # CSV/JSON research export modal
    │   ├── cards/
    │   │   ├── MetricCard.jsx     # Scientific indicator card
    │   │   ├── CountryCard.jsx    # Country overview card
    │   │   ├── PolicyCard.jsx     # Expandable policy card with budget & outcomes
    │   │   ├── OrganizationCard.jsx # Verified institutional card
    │   │   ├── DataSourceCard.jsx # Provenance card with limitations toggle
    │   │   └── TopicCard.jsx      # Thematic navigation card
    │   ├── charts/
    │   │   ├── EmissionsTimelineChart.jsx # Interactive multi-country timeline (1990-2023)
    │   │   ├── CountryComparisonBarChart.jsx # Multi-metric comparative bar chart
    │   │   └── SectorBreakdownPieChart.jsx # Economic sector donut chart
    │   ├── tables/
    │   │   ├── CountryComparisonTable.jsx # Side-by-side indicator matrix
    │   │   ├── CountryDirectoryTable.jsx  # Sortable country directory table
    │   │   └── MethodologyMatrixTable.jsx # UNFCCC vs EDGAR vs Climate TRACE matrix
    │   └── layout/
    │       ├── AppLayout.jsx      # Shell layout with header, sidebar, mobile nav
    │       ├── Sidebar.jsx        # Desktop left navigation with active indicators
    │       ├── Header.jsx         # Top header with global search & export trigger
    │       ├── MobileNav.jsx      # Mobile drawer navigation
    │       ├── GlobalSearchModal.jsx # Instant modal search (Ctrl+K)
    │       └── Footer.jsx         # Citation attribution & Open Science notes
    └── pages/
        ├── OverviewPage.jsx       # Page 1: Global Overview Dashboard
        ├── CountryExplorerPage.jsx# Page 2: Country Explorer
        ├── CountryProfilePage.jsx # Page 3: Country Profile (Overview, Emissions, Policies, Targets, Methodology, Sources)
        ├── CompareCountriesPage.jsx# Page 4: Compare Countries (2-4 countries)
        ├── EmissionsPage.jsx      # Page 5: Pollution & Emissions Deep Dive
        ├── PoliciesPage.jsx       # Page 6: Policies & Schemes Explorer
        ├── MethodologiesPage.jsx  # Page 7: Methodology Explorer
        ├── OrganizationsPage.jsx  # Page 8: People & Organizations Directory
        ├── DataSourcesPage.jsx    # Page 9: Transparent Data Sources
        ├── AboutPage.jsx          # Page 10: About, MERN Endpoints & Governance
        └── NotFoundPage.jsx       # 404 Handler
```

---

## 8. License & Attribution

- **Data Sources:** EDGAR v8.0 (CC BY 4.0), UNFCCC National Communications, Global Carbon Budget 2023 (CC BY 4.0), IEA Open Statistics.
- **Platform:** Released for educational and research exploration under MIT License.
