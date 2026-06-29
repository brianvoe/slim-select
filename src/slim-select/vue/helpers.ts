import { isReactive, isRef, toRaw, unref } from 'vue'

/** Recursively strip Vue reactivity so structuredClone won't throw on Proxy objects. */
export function deepToRaw<T>(input: T): T {
  const seen = new WeakMap<object, any>()
  const convert = (val: any): any => {
    if (isRef(val)) val = unref(val)
    if (isReactive(val)) val = toRaw(val)
    if (val === null || typeof val !== 'object') return val
    if (seen.has(val)) return seen.get(val)
    if (Array.isArray(val)) {
      const arr: any[] = []
      seen.set(val, arr)
      for (const item of val) arr.push(convert(item))
      return arr
    }
    const obj: Record<string, any> = {}
    seen.set(val, obj)
    for (const key of Object.keys(val)) obj[key] = convert(val[key])
    return obj
  }
  return convert(input)
}
