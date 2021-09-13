import { HashSet } from '../../src'

describe('HashSet', () => {
  test('len()', () => {
    const set = new HashSet<string | number>([21, 99, 'hello', 4, 'test', 27, 'a'])

    expect(set.len()).toBe(7)
  })

  test('insert()', () => {
    const set = new HashSet<any>([11, 8, 3, 17])

    expect(set.insert(11)).toBe(false)
    expect(() => set.insert([4, 13, 9])).toThrow(TypeError)
    expect(() => set.insert({ a: 10 })).toThrow(TypeError)
    expect(() => set.insert(false)).toThrow(TypeError)
    expect(set.insert(7)).toBe(true)
    expect(set.insert(7)).toBe(false)
  })

  test('remove()', () => {
    const set = new HashSet<number>([11, 8, 3, 17])

    expect(set.remove(3)).toBe(true)
    expect(set.remove(11)).toBe(true)
    expect(set.remove(88)).toBe(false)
  })

  test('contains()', () => {
    const set = new HashSet<number | string>([11, 'rick', 8, 3, 'bulma', 17])

    expect(set.contains(3)).toBe(true)
    expect(set.contains(17)).toBe(true)
    expect(set.contains('bulma')).toBe(true)
    expect(set.contains(21)).toBe(false)
  })

  test('drain()', () => {
    const set = new HashSet<number>([11, 8, 3, 17])
    const clone = new HashSet<number>([11, 8, 3, 17])

    for (const value of set.drain()) {
      expect(clone.contains(value)).toBe(true)
    }

    expect(set.len()).toBe(0)
    expect(clone.len()).toBe(4)
  })

  test('clear()', () => {
    const set = new HashSet<number>([11, 8, 3, 17])

    expect(set.len()).toBe(4)
    set.clear()
    expect(set.len()).toBe(0)
  })

  test('toArray()', () => {
    const set = new HashSet<number>([11, 8, 3, 17])

    expect(set.toArray().sort()).toEqual([11, 8, 3, 17].sort())
    expect(set.toArray()).toHaveLength(4)
  })

  test('forEach()', () => {
    const set = new HashSet<number>([11, 8, 3, 17])
    const clone = new HashSet<number>([11, 8, 3, 17])

    set.forEach(value => {
      expect(clone.contains(value)).toBe(true)
    })

    expect(set.len()).toBe(4)
    expect(clone.len()).toBe(4)
  })

  test('union()', () => {
    const setA = new HashSet<number>([11, 8, 3, 17])
    const setB = new HashSet<number>([21, 7, 17, 8, 51])
    const unionAB = setA.union(setB)

    expect(unionAB.len()).toBe(7)
    expect(unionAB.toArray().sort()).toEqual([11, 8, 3, 17, 21, 7, 51].sort())
  })

  test('intersection()', () => {
    const setA = new HashSet<number | string>([11, 'rick', 8, 3, 'bulma', 17])
    const setB = new HashSet<number | string>(['bulma', 21, 7, 11, 17, 8, 51])
    const intersectionAB = setA.intersection(setB)

    expect(intersectionAB.len()).toBe(4)
    expect(intersectionAB.toArray().sort()).toEqual([8, 17, 'bulma', 11].sort())
  })

  test('difference()', () => {
    const setA = new HashSet<number | string>([11, 'rick', 8, 3, 'bulma', 17])
    const setB = new HashSet<number | string>(['bulma', 21, 7, 11, 17, 8, 51])
    const differenceAB = setA.difference(setB)

    expect(differenceAB.len()).toBe(2)
    expect(differenceAB.toArray().sort()).toEqual([3, 'rick'].sort())
  })

  test('equals()', () => {
    const setA = new HashSet<number>([11, 8, 3, 17])
    const setAClone = new HashSet<number>([11, 8, 3, 17])
    const setB = new HashSet<number>([21, 7, 17, 8, 51])

    expect(setA.equals(setA)).toBe(true)
    expect(setA.equals(setB)).toBe(false)
    expect(setB.equals(setAClone)).toBe(false)
    expect(setA.equals(setAClone)).toBe(true)
  })

  test('isSubsetOf() & isStrictSubsetOf()', () => {
    const setA = new HashSet<number | string>([11, 'rick', 8, 3, 'bulma', 17])
    const setAClone = new HashSet<number | string>([3, 11, 'bulma', 17, 'rick', 8])
    const setB = new HashSet<number | string>([3, 'bulma', 21, 7, 11, 'rick', 17, 8, 51])

    expect(setA.isSubsetOf(setA)).toBe(true)
    expect(setA.isSubsetOf(setB)).toBe(true)
    expect(setB.isSubsetOf(setAClone)).toBe(false)
    expect(setA.isSubsetOf(setAClone)).toBe(true)

    expect(setA.isStrictSubsetOf(setA)).toBe(false)
    expect(setA.isStrictSubsetOf(setB)).toBe(true)
    expect(setB.isStrictSubsetOf(setB)).toBe(false)
  })

  test('isSupersetOf() & isStrictSupersetOf()', () => {
    const setA = new HashSet<any>([11, 'rick', 8, 3, 'bulma', 17])
    const setAClone = new HashSet<any>([3, 11, 'bulma', 17, 'rick', 8])
    const setB = new HashSet<any>([3, 'bulma', 21, 7, 11, 'rick', 17, 8, 51])

    expect(setA.isSupersetOf(setA)).toBe(true)
    expect(setA.isSupersetOf(setB)).toBe(false)
    expect(setB.isSupersetOf(setAClone)).toBe(true)
    expect(setA.isSupersetOf(setAClone)).toBe(true)

    expect(setA.isStrictSupersetOf(setA)).toBe(false)
    expect(setB.isStrictSupersetOf(setA)).toBe(true)
    expect(setB.isStrictSupersetOf(setB)).toBe(false)
  })
})
