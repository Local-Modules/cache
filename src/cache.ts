import memoryCache from 'memory-cache'


// @ts-ignore
const CACHE_AGE = +process.env.CACHE_AGE || 60 * 10 * 1000 // 10 minutes by default

// returns all cached keys
export const keys = (): string[] => {
  return memoryCache.keys()
}

export const set = (key: string, data: any, cacheAge: number = CACHE_AGE) => {
  memoryCache.put(key, data, cacheAge)
}

export const get = <T>(key: string): T | null => {
  return memoryCache.get(key)
}

// clears specific key
export const clear = (key: string) => {
  memoryCache.del(key)
}

// clears all keys that match pattern
export const clearMatch = (pattern: string) => {
  const res: string[] = keys()

  const matchedKeys = res.filter(key => key.includes(pattern))
  matchedKeys.forEach(key => {
    clear(key)
  })
} 

// clears all keys
export const clearAll = () => {
  memoryCache.clear()
}
