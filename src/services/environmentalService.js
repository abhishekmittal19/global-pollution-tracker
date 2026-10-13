/**
 * Environmental Intelligence Service Layer
 * Abstracts data access so UI components never touch raw data sources directly.
 * Ready for drop-in REST API endpoints from a Node.js / Express / MongoDB backend.
 */

import { apiClient } from './api';
import { COUNTRIES } from '../data/countriesData';
import { POLICIES } from '../data/policiesData';
import { METHODOLOGIES, INVENTORY_COMPARISON_MATRIX } from '../data/methodologiesData';
import { ORGANIZATIONS } from '../data/organizationsData';
import { DATA_SOURCES } from '../data/dataSourcesData';
import { GLOBAL_INDICATORS, EXPLORE_TOPICS, RECENT_RESEARCH_PUBLICATIONS } from '../data/globalOverviewData';

/**
 * Fetch global overview statistics, topic taxonomies, and recent publications
 */
export async function getGlobalOverview() {
  try {
    return await apiClient('/overview');
  } catch (err) {
    // Fallback to local dataset
    return {
      indicators: GLOBAL_INDICATORS,
      topics: EXPLORE_TOPICS,
      recentResearch: RECENT_RESEARCH_PUBLICATIONS,
      featuredCountries: COUNTRIES.slice(0, 3), // India, Germany, China
    };
  }
}

/**
 * Fetch list of countries with filtering, searching, and sorting
 */
export async function getCountries(params = {}) {
  const { region, search, sortBy = 'totalEmissionsCO2', sortOrder = 'desc' } = params;

  try {
    const query = new URLSearchParams(params).toString();
    return await apiClient(`/countries?${query}`);
  } catch (err) {
    let result = [...COUNTRIES];

    if (region && region !== 'All Regions') {
      result = result.filter(c => c.region.toLowerCase() === region.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let valA = a.indicators[sortBy];
      let valB = b.indicators[sortBy];

      if (sortBy === 'name') {
        valA = a.name;
        valB = b.name;
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      valA = valA ?? -Infinity;
      valB = valB ?? -Infinity;

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }
}

/**
 * Fetch individual country profile by ID or ISO3 code
 */
export async function getCountryById(id) {
  try {
    return await apiClient(`/countries/${id}`);
  } catch (err) {
    const normalized = id?.toLowerCase();
    const country = COUNTRIES.find(c => c.id.toLowerCase() === normalized || c.iso3.toLowerCase() === normalized);
    if (!country) {
      throw new Error(`Country with identifier "${id}" not found.`);
    }
    return country;
  }
}

/**
 * Fetch specific indicators and historical timeline for a country
 */
export async function getCountryIndicators(id) {
  try {
    return await apiClient(`/countries/${id}/indicators`);
  } catch (err) {
    const country = await getCountryById(id);
    return {
      countryId: country.id,
      indicators: country.indicators,
      historicalTimeline: country.historicalTimeline,
      sectorBreakdown: country.sectorBreakdown,
    };
  }
}

/**
 * Compare multiple countries side-by-side
 */
export async function compareCountries(countryIds = ['india', 'germany', 'china'], metricKey = 'perCapitaCO2') {
  try {
    const query = `ids=${countryIds.join(',')}&metric=${metricKey}`;
    return await apiClient(`/compare?${query}`);
  } catch (err) {
    const selectedCountries = COUNTRIES.filter(c => countryIds.includes(c.id));
    
    // Construct aligned timeline for comparison charts
    const years = [1990, 1995, 2000, 2005, 2010, 2015, 2018, 2020, 2021, 2022, 2023];
    const comparisonTimeline = years.map(year => {
      const entry = { year };
      selectedCountries.forEach(country => {
        const point = country.historicalTimeline.find(p => p.year === year);
        if (point) {
          if (metricKey === 'perCapitaCO2') entry[country.id] = point.perCapitaCO2;
          else if (metricKey === 'totalEmissionsCO2') entry[country.id] = point.co2;
          else if (metricKey === 'totalGHG') entry[country.id] = point.ghg;
          else if (metricKey === 'renewableShare') entry[country.id] = point.renewableShare;
        } else {
          entry[country.id] = null;
        }
      });
      return entry;
    });

    return {
      countries: selectedCountries,
      metricKey,
      comparisonTimeline,
    };
  }
}

/**
 * Fetch policy records with filtering
 */
export async function getPolicies(params = {}) {
  const { countryId, sector, status, policyType, search } = params;

  try {
    const query = new URLSearchParams(params).toString();
    return await apiClient(`/policies?${query}`);
  } catch (err) {
    let result = [...POLICIES];

    if (countryId && countryId !== 'all') {
      result = result.filter(p => p.countryId === countryId);
    }

    if (sector && sector !== 'All Sectors') {
      result = result.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
    }

    if (status && status !== 'All Statuses') {
      result = result.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }

    if (policyType && policyType !== 'All Types') {
      result = result.filter(p => p.policyType.toLowerCase() === policyType.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.objective.toLowerCase().includes(q) ||
        p.countryName.toLowerCase().includes(q) ||
        p.responsibleAgency.toLowerCase().includes(q)
      );
    }

    return result;
  }
}

/**
 * Fetch methodology frameworks and comparison matrix
 */
export async function getMethodologies(params = {}) {
  const { category, search } = params;

  try {
    const query = new URLSearchParams(params).toString();
    return await apiClient(`/methodologies?${query}`);
  } catch (err) {
    let result = [...METHODOLOGIES];

    if (category && category !== 'All Categories') {
      result = result.filter(m => m.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }

    return {
      frameworks: result,
      comparisonMatrix: INVENTORY_COMPARISON_MATRIX,
    };
  }
}

/**
 * Fetch people and organizations directory
 */
export async function getOrganizations(params = {}) {
  const { type, countryId, search } = params;

  try {
    const query = new URLSearchParams(params).toString();
    return await apiClient(`/organizations?${query}`);
  } catch (err) {
    let result = [...ORGANIZATIONS];

    if (type && type !== 'All Types') {
      result = result.filter(o => o.type.toLowerCase() === type.toLowerCase());
    }

    if (countryId && countryId !== 'all') {
      result = result.filter(o => o.countryId === countryId);
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.areaOfWork.toLowerCase().includes(q) ||
        o.countryName.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q)
      );
    }

    return result;
  }
}

/**
 * Fetch transparent data sources
 */
export async function getDataSources(params = {}) {
  const { category, search } = params;

  try {
    const query = new URLSearchParams(params).toString();
    return await apiClient(`/data-sources?${query}`);
  } catch (err) {
    let result = [...DATA_SOURCES];

    if (category && category !== 'All Categories') {
      result = result.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.publisher.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.accessNotes.toLowerCase().includes(q)
      );
    }

    return result;
  }
}

/**
 * Universal Global Search across all models
 */
export async function searchGlobal(query) {
  if (!query || query.trim().length < 2) {
    return { countries: [], policies: [], methodologies: [], organizations: [] };
  }

  const q = query.toLowerCase().trim();

  const matchedCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.iso3.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q)
  ).map(c => ({
    id: c.id,
    title: `${c.flag} ${c.name}`,
    type: 'Country',
    subtitle: `${c.region} • ${c.indicators.totalEmissionsCO2} Mt CO₂`,
    url: `/countries/${c.id}`
  }));

  const matchedPolicies = POLICIES.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.objective.toLowerCase().includes(q) ||
    p.countryName.toLowerCase().includes(q)
  ).map(p => ({
    id: p.id,
    title: p.title,
    type: 'Policy',
    subtitle: `${p.countryFlag} ${p.countryName} • ${p.sector}`,
    url: `/policies?id=${p.id}`
  }));

  const matchedMethodologies = METHODOLOGIES.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.summary.toLowerCase().includes(q)
  ).map(m => ({
    id: m.id,
    title: m.title,
    type: 'Methodology',
    subtitle: m.category,
    url: `/methodologies#${m.id}`
  }));

  const matchedOrganizations = ORGANIZATIONS.filter(o =>
    o.name.toLowerCase().includes(q) ||
    o.areaOfWork.toLowerCase().includes(q)
  ).map(o => ({
    id: o.id,
    title: o.name,
    type: 'Organization',
    subtitle: `${o.countryFlag} ${o.type} • ${o.areaOfWork.slice(0, 40)}...`,
    url: `/organizations?id=${o.id}`
  }));

  return {
    countries: matchedCountries,
    policies: matchedPolicies,
    methodologies: matchedMethodologies,
    organizations: matchedOrganizations,
  };
}
