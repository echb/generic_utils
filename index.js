
/**
 *@template T
 *@template R
 *
 * @callback valuesCallback
 * @param {T} value1 - An integer.
 * @param {R} value2 - An integer.
 * @param {number} index - An integer.
 */

/**
 *@template T
 *@template R
 *
 * @callback idsCallback
 * @param {T} value1 - An integer.
 * @param {R} value2 - An integer.
 * @returns {Array} - It must return two values [value1, value2]
 */

/**
 * It can return 4 possible set's:
 * - differenceA = A\B
 * - differenceB = B\A
 * - intersection = A∩B
 * - symetricDifference = A∆B
 * 
 * @param {Object} param - 
 * @param {Array<T>} [param.setA ]
 * @param {Array<R>} [param.setB]
 * @param {"intersection"|"differenceA"|"differenceB"|"symetricDifference"} [param.setType]
 * @param {Boolean} [param.removeRepeatedValues] -
 * @param {valuesCallback<T, R>} [param.valuesCallback] - A callback wich return [].
 * @param {idsCallback<T, R>} [param.idsCallback] - A callback wich return [idA, idB].
 * @returns {Array<T>}
 * @template T
 * @template R
 */
export function setTheory({ setA = [], setB = [], setType = 'symetricDifference', removeRepeatedValues = true, valuesCallback = (a, b, index) => ({ id1: a, value1: a, id2: b, value2: b }), idsCallback = (a, b) => [a, b] }) {
  const result = new Values(removeRepeatedValues)

  const tempDicArr1 = {}
  const tempDicArr2 = {}
  const total = setA.length >= setB.length ? setA.length : setB.length
  let objCount1 = 0
  let objCount2 = 0

  for (let i = 0; i < total; i++) {
    const [validId1, validId2] = idsCallback(setA[i], setB[i])
    if (setA[i] !== undefined && validId1 !== undefined && tempDicArr1[validId1] === undefined) {
      tempDicArr1[validId1] = { value: setA[i], hash: validId1 }
      objCount1++
    }
    if (setB[i] !== undefined && validId2 !== undefined && tempDicArr2[validId2] === undefined) {
      tempDicArr2[validId2] = { value: setB[i], hash: validId2 }
      objCount2++
    }
  }

  const objCountTotal = objCount1 >= objCount2 ? objCount1 : objCount2
  const selectMap = removeRepeatedValues ? objCountTotal : total

  for (let i = 0; i < selectMap; i++) {
    const { id1, value1: res1, id2, value2: res2 } = valuesCallback(setA[i], setB[i], i)

    const valueAInArray1 = tempDicArr1[id1]?.hash
    const valueBInArray1 = tempDicArr2[id1]?.hash

    const valueBInArray2 = tempDicArr2[id2]?.hash
    const valueAInArray2 = tempDicArr1[id2]?.hash

    if (setType === 'differenceA') {
      if (valueAInArray1 !== valueBInArray1) {
        result.add(valueAInArray1, res1)
      }
    }

    if (setType === 'differenceB') {
      if (valueBInArray2 !== valueAInArray2) {
        result.add(valueAInArray2, res2)
      }
    }

    if (setType === 'symetricDifference') {
      if (valueAInArray1 !== valueBInArray1) {
        result.add(valueAInArray1, res1)
      }
      if (valueBInArray2 !== valueAInArray2) {
        result.add(valueAInArray2, res2)
      }
    }

    if (setType === 'intersection') {
      if (valueAInArray1 === valueBInArray1 && valueAInArray1 !== undefined) {
        result.add(valueAInArray1, res1)
      }
      if (valueBInArray2 === valueAInArray2 && valueBInArray2 !== undefined) {
        result.add(valueAInArray2, res2)
      }
    }
  }

  return result.value()
}

class Values {
  #removeRepeatedValues = true
  #setValues = {}
  #arrayValues = []

  constructor(removeRepeatedValues = true) {
    this.#removeRepeatedValues = removeRepeatedValues
  }

  add(id, value) {
    if (this.#removeRepeatedValues) {
      this.#setValues[id] = value
      return
    }
    this.#arrayValues.push(value)
  }

  value() {
    if (this.#removeRepeatedValues) {
      return Object.values(this.#setValues)
    }

    return this.#arrayValues
  }
}
