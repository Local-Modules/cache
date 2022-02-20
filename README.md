# Cache

This library enhances [`memory-cache`](https://www.npmjs.com/package/memory-cache) module with Typescript support. 

## Installation

`npm install --save @locmod/cache`

## Usage

```ts
import cache from '@locmod/cache'
```

#### cache.set 
```ts
(key: string, data: any, cacheAge?: number) => void
```

Saves the cache for specific amount of time. Default is 10 minutes.

```ts
cache.set('key1', { foo: 'bar' })
cache.set('key2', [1, 2, 3])
cache.set('key3', 'foo', 1000) // 1 second
```

---


#### cache.get 
```ts
<T>(key: string) => T | null
```

Gets the saved cache if there is any. 
If no cache saved for this key, or it's expired, `null` will be returned. Supports generic types

```ts
cache.get('key1') // { foo: 'bar' }
cache.get<number[]>('key2') // [1, 2, 3]
cache.get<string>('key3') // 'foo'

setTimeout(() => {
  cache.get<string>('key3') // null
}, 2000)
```

---

#### cache.keys 
```ts
() => string[]
```

Returns all the saved keys

```ts
cache.keys() // ['key1', 'key2', 'key3']
```

---

#### cache.clear 
```ts
(key: string) => void
```

Removes the saved key

```ts
cache.set('foo', 'bar')
cache.get('foo') // bar

cache.clear('foo')
cache.get('foo') // null
```

---

#### cache.clearMatch 
```ts
(pattern: string) => void
```

Removes all the saved keys that matches the pattern

```ts
cache.set('match-1', 'bar')
cache.set('match-2', 'bar')
cache.set('match-3', 'bar')
cache.set('foo', 'bar')

cache.clearMatch('match-')

cache.get('match-1') // null
cache.get('match-2') // null
cache.get('match-3') // null
cache.get('foo')     // bar
```

---

#### cache.clearAll 
```ts
() => void
```

Removes the saved keys

```ts
cache.set('match-1', 'bar')
cache.set('match-2', 'bar')
cache.set('match-3', 'bar')
cache.set('foo', 'bar')

cache.clearAll('match-')

cache.get('match-1') // null
cache.get('match-2') // null
cache.get('match-3') // null
cache.get('foo')     // null
```


