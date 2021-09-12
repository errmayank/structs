import { Str } from '../../src/utils/Conv'

describe('Str()', () => {
  test('Returns a string', () => {
    expect(Str(999)).toBe('999')
    expect(Str('Juice Wrld')).toBe('Juice Wrld')
  })

  test('Preserves -ve value of a number', () => {
    expect(Str(-1234)).toBe('-1234')
    expect(Str(-0)).toBe('-0')
  })
})
