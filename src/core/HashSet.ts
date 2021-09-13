import { Str } from '../utils/Conv'

export class HashSet<T extends string | number | bigint> {
  #data: { [key in string]: T } = {}

  constructor(values: T[] = []) {
    values.forEach(value => this.insert(value))
  }

  /**
   * @returns Length of the HashSet.
   */
  public len(): number {
    return Object.keys(this.#data).length
  }

  /**
   * Inserts value to the HashSet. If the value already exists in the HashSet it
   * will return false, else true.
   *
   * @remarks
   * This method throws an error if the provided value is not of valid type,
   * i.e string, number or bigint.
   *
   * @param Value - Value to insert
   * @returns boolean
   */
  public insert(value: T): boolean {
    const type = typeof value
    if (type !== 'string' && type !== 'number' && type !== 'bigint') {
      throw new TypeError(`Cannot insert ${value} of type ${type} in a HashSet`)
    }

    if (Str(value) in this.#data) {
      return false
    }
    this.#data[Str(value)] = value
    return true
  }

  /**
   * Removes value from the HashSet. Returns true or false depending on whether
   * given value was successfully removed from the HashSet or not.
   *
   * @param Value - Value to remove
   * @returns boolean
   */
  public remove(value: T): boolean {
    if (Str(value) in this.#data) {
      delete this.#data[Str(value)]
      return true
    }
    return false
  }

  /**
   * Returns true or false depending on whether given value exists in
   * the HashSet or not.
   *
   * @param Value - Value to check
   * @returns boolean
   */
  public contains(value: T): boolean {
    if (Str(value) in this.#data) {
      return true
    }
    return false
  }

  /**
   * Clears the HashSet and returns all values in an iterator.
   *
   * @returns iterator
   */
  public drain(): IterableIterator<T> {
    const data = this.#data
    this.clear()

    return Object.values(data)[Symbol.iterator]()
  }

  /**
   * Clears the HashSet and returns true.
   *
   * @returns true
   */
  public clear(): true {
    this.#data = {}

    return true
  }

  /**
   * Returns values of HashSet in an array
   *
   * @returns array
   */
  public toArray(): T[] {
    return Object.values(this.#data)
  }

  /**
   * Iterates over values of the HashSet and invokes the function for each value.
   *
   * @param function The function invoked per iteration.
   * @returns null
   */
  public forEach(callback: (value: T) => void): void {
    for (const [_, value] of Object.entries(this.#data)) {
      callback(value)
    }

    return
  }

  /**
   * Performs union between two HashSets and returns the result in a new HashSet
   *
   * @param otherHashSet HashSet to perform union against
   * @returns HashSet
   */
  public union(otherHashSet: HashSet<T>): HashSet<T> {
    return new HashSet([...this.toArray(), ...otherHashSet.toArray()])
  }

  /**
   * Performs intersection between two HashSets and returns the result in a new HashSet
   *
   * @param otherHashSet HashSet to perform intersection against
   * @returns HashSet
   */
  public intersection(otherHashSet: HashSet<T>): HashSet<T> {
    const matchedValues: T[] = []

    otherHashSet.forEach(value => {
      if (this.contains(value)) {
        matchedValues.push(value)
      }
    })

    return new HashSet(matchedValues)
  }

  /**
   * Performs difference between two HashSets and returns the result in a new HashSet
   *
   * @param otherHashSet HashSet to perform difference against
   * @returns HashSet
   */
  public difference(otherHashSet: HashSet<T>): HashSet<T> {
    const diff: T[] = []

    this.forEach(value => {
      if (!otherHashSet.contains(value)) {
        diff.push(value)
      }
    })

    return new HashSet(diff)
  }

  /**
   * Checks if two HashSets are equal
   *
   * @param otherHashSet HashSet to check equality against
   * @returns boolean
   */
  public equals(otherHashSet: HashSet<T>): boolean {
    if (this.len() !== otherHashSet.len()) return false

    this.forEach(value => {
      if (!otherHashSet.contains(value)) {
        return false
      }
    })

    return true
  }

  /**
   * Checks if the HashSet is a subset of another HashSet
   *
   * @param otherHashSet HashSet to check against
   * @returns boolean
   */
  public isSubsetOf(otherHashSet: HashSet<T>): boolean {
    if (this.len() > otherHashSet.len()) return false

    this.forEach(value => {
      if (!otherHashSet.contains(value)) {
        return false
      }
    })

    return true
  }

  /**
   * Checks if the HashSet is a strict subset of another HashSet
   *
   * @param otherHashSet HashSet to check against
   * @returns boolean
   */
  public isStrictSubsetOf(otherHashSet: HashSet<T>): boolean {
    if (this.len() === otherHashSet.len()) return false

    return this.isSubsetOf(otherHashSet)
  }

  /**
   * Checks if the HashSet is a superset of another HashSet
   *
   * @param otherHashSet HashSet to check against
   * @returns boolean
   */
  public isSupersetOf(otherHashSet: HashSet<T>): boolean {
    return otherHashSet.isSubsetOf(this)
  }

  /**
   * Checks if the HashSet is a strict superset of another HashSet
   *
   * @param otherHashSet HashSet to check against
   * @returns boolean
   */
  public isStrictSupersetOf(otherHashSet: HashSet<T>): boolean {
    return otherHashSet.isStrictSubsetOf(this)
  }
}
