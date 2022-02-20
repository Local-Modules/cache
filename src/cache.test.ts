import { get, set, keys, clearAll, clear, clearMatch } from './cache'

// need this because of setTimeout
jest.useFakeTimers()

describe('cache test', () => {
  it('test numbers', async () => {
    set('num1', 300)
    set('num2', 0.3432432432423423)

    expect(get('num1')).toEqual(300)
    expect(get('num2')).toEqual(0.3432432432423423)
    expect(get('num3')).toEqual(null)
  })

  it('test strings', async () => {
    set('string', 'test')
    const reallylongstring = 'x'.repeat(10*100*100)
    set('reallylongstring', reallylongstring)

    expect(get('string')).toEqual('test')
    expect(get('reallylongstring')).toEqual(reallylongstring)
    expect(get('null')).toEqual(null)
  })

  it('test arrays', async () => {
      const array = [1, 2, 3]
      set('array', array)

      expect(get('array')).toEqual(array)
  })

  it('test objects', async () => {
      const object = { foo: 3, bar: 44 }
      set('object', object)

      expect(get('object')).toEqual(object)
  })

  it('test cache age', async () => {
    set('bar', 'test', 300)

    expect(get('bar')).toEqual('test')

    setTimeout(async () => {
      expect(get('bar')).toEqual('test')
    }, 250)
    
    setTimeout(async () => {
      expect(get('bar')).toEqual(null)
    }, 300)
  })

  it('test clean', async () => {
    set('clear', 3)

    expect(get('clear')).toEqual(3)
    clear('clear')
    expect(get('clear')).toEqual(null)
  })

  it('test clean match', async () => {
    set('match-1', 100)
    set('match-2', 100)
    set('match-3', 100)
    set('match-4', 100)
    set('should-not-match', 100)

    expect(get('match-1')).toEqual(100)
    expect(get('match-2')).toEqual(100)
    expect(get('match-3')).toEqual(100)
    expect(get('match-4')).toEqual(100)
    expect(get('should-not-match')).toEqual(100)

    clearMatch('match-')

    expect(get('match-1')).toEqual(null)
    expect(get('match-2')).toEqual(null)
    expect(get('match-3')).toEqual(null)
    expect(get('match-4')).toEqual(null)
    expect(get('should-not-match')).toEqual(100)
  })

  it('test clean all', async () => {
    set('foo', 'bar')
    const savedKeys = keys().length
    expect(savedKeys).not.toEqual(0)

    clearAll()

    expect(keys().length).toEqual(0)
    expect(get('foo')).toEqual(null)
  })
})

