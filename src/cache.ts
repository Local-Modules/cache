import memoryCache from 'memory-cache'


// @ts-ignore
export const CACHE_AGE = +process.env.CACHE_AGE || 60 * 10 * 1000 // 10 minutes by default

class cache {
  private _cacheAge: number

  constructor () {
    this._cacheAge = CACHE_AGE
  }

  get cacheAge () {
    return this._cacheAge
  }

  set cacheAge (value: number) {
    this._cacheAge = value
  }

  public set = <T>(key: string, data: T, cacheAge: number = this._cacheAge) => {
    memoryCache.put(key, JSON.stringify(data), cacheAge)
  }

  public get = async <T>(key: string): Promise<T | null> => {
    const data: string = memoryCache.get(key)

    try {
      return JSON.parse(data) as T
    }
    catch (error) {
      console.error('parse cache error for key')
      this.clear(key)
      return null
    }
  }

  // clears specific key
  public clear = (key: string) => {
    memoryCache.del(key)
  }

  // clears all keys that match pattern
  public clearMatch = (pattern: string) => {
    const keys: string[] = this.keys()

    const matchedKeys = keys.filter(key => key.includes(pattern))
    matchedKeys.forEach(key => {
      this.clear(key)
    })
  } 

  // clears all keys
  public clearAll = () => {
    memoryCache.clear()
  }

  // returns all cached keys
  public keys = (): string[] => {
    return memoryCache.keys()
  }
}

export default new cache
