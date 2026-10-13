/**
 * Scientific data formatting utilities
 */

/**
 * Formats a metric value with appropriate decimals and handles missing data gracefully.
 * Never outputs a misleading 0 for missing data.
 */
export function formatMetric(value, options = {}) {
  const {
    decimals = 1,
    unit = '',
    fallback = '— Not Reported',
    prefix = '',
    compact = false
  } = options;

  if (value === null || value === undefined || Number.isNaN(value) || value === '') {
    return fallback;
  }

  const num = Number(value);

  if (compact && Math.abs(num) >= 1000) {
    // Compact formatting (e.g. 1.2B, 3.4M)
    return `${prefix}${new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: decimals
    }).format(num)}${unit ? ' ' + unit : ''}`;
  }

  const formattedNum = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  }).format(num);

  return `${prefix}${formattedNum}${unit ? ' ' + unit : ''}`;
}

/**
 * Formats percentage values safely
 */
export function formatPercentage(value, decimals = 1, fallback = '—') {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Formats population counts into millions or billions
 */
export function formatPopulation(val) {
  if (!val) return '—';
  if (val >= 1_000_000_000) {
    return `${(val / 1_000_000_000).toFixed(2)} Billion`;
  }
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1)} Million`;
  }
  return val.toLocaleString();
}

/**
 * Formats delta / change with positive/negative signs
 */
export function formatTrend(trendValue, unit = '%') {
  if (trendValue === null || trendValue === undefined) return null;
  const num = Number(trendValue);
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(1)}${unit}`;
}
