import { HashSet } from '../../src'

describe('HashSet', () => {
  const setA = new HashSet([1, 2, 3, 4, 5, 7, 27])
  const setB = new HashSet([1, 7, 27, 4, 13, 21])

  test('len()', () => {
    expect(setA.len()).toBe(7)
  })

  test('contains()', () => {
    expect(setA.contains(3)).toBe(true)
    expect(setA.contains(21)).toBe(false)
  })

  const setC = new HashSet()

  test('insert()', () => {
    expect(setC.insert(7)).toBe(true)
    expect(setC.contains(7)).toBe(true)
  })

  test('union()', () => {
    const unionAB = setA.union(setB)

    expect(unionAB.len()).toBe(9)
    expect(unionAB.toArray().sort()).toEqual([1, 2, 3, 4, 5, 7, 13, 21, 27].sort())
  })

  test('intersection()', () => {
    const intersectionAB = setA.intersection(setB)

    expect(intersectionAB.toArray().sort()).toEqual([1, 4, 7, 27].sort())
  })

  test('difference()', () => {
    const differenceAB = setA.difference(setB)

    expect(differenceAB.toArray().sort()).toEqual([2, 3, 5].sort())
  })

  test('equals()', () => {
    const setACopy = new HashSet([1, 2, 3, 4, 5, 7, 27])
    expect(setA.equals(setB)).toBe(false)
    expect(setA.equals(setACopy)).toBe(true)
  })

  const setD = new HashSet([4, 7, 27])
  const setE = new HashSet([4, 7, 27])
  const setF = new HashSet([11, 4, 7, 27, 21])

  test('isSubsetOf() & isStrictSubsetOf()', () => {
    expect(setD.isSubsetOf(setA)).toBe(true)
    expect(setF.isSubsetOf(setD)).toBe(false)
    expect(setE.isSubsetOf(setD)).toBe(true)
    expect(setE.isStrictSubsetOf(setD)).toBe(false)
  })

  test('isSupersetOf() & isStrictSupersetOf()', () => {
    expect(setA.isSupersetOf(setD)).toBe(true)
    expect(setD.isSupersetOf(setF)).toBe(false)
    expect(setF.isSupersetOf(setD)).toBe(true)
    expect(setD.isSupersetOf(setE)).toBe(true)
    expect(setD.isStrictSupersetOf(setE)).toBe(false)
  })
})
