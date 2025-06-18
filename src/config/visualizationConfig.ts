export const VISUALIZATION_CONFIG = {
  array: {
    barWidth: {
      min: 4,
      max: 30,
      default: 30
    },
    containerHeight: {
      mobile: '15rem',
      desktop: '20rem'
    },
    colors: {
      default: 'bg-accent',
      highlight: 'bg-amber-500',
      compare: 'bg-blue-500',
      sorted: 'bg-green-500'
    }
  },
  graph: {
    svgSize: 400,
    colors: {
      default: '#94a3b8',
      current: '#f97316',
      visited: '#22c55e',
      inQueue: '#3b82f6',
      inStack: '#8b5cf6'
    },
    stroke: {
      color: '#1e293b',
      width: 2
    }
  },
  search: {
    barWidth: {
      min: 4,
      max: 30,
      default: 30
    },
    containerHeight: {
      mobile: '15rem',
      desktop: '20rem'
    },
    colors: {
      default: 'bg-accent',
      current: 'bg-amber-500',
      search: 'bg-blue-500',
      found: 'bg-green-500'
    }
  }
} as const; 