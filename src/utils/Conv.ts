export const Str = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value

  return `${value}` === '0' && 1 / value === -Infinity ? '-0' : `${value}`
}
