import { isArray, isDefined } from 'class-validator'

export function sanitize<T>(source: T, field: string): T {
  if (typeof source !== 'object') return source
  if (isArray(source)) {
    for (const item of source as any[]) {
      sanitize(item, field)
    }
  }
  for (const [key, value] of Object.entries(source) as any) {
    if (!isDefined(value)) continue
    if (typeof value === 'object') source = sanitize(value, field)
    if (key === field) {
      delete source[key]
    }
  }
  return source
}
