import { isObject, hasOwn } from "@vue/shared";
import type { PropType } from 'vue';
import { warn } from 'vue';
import type {
  BpProp,
  BpPropConvert,
  BpPropFinalized,
  BpPropInput,
  BpPropMergeType,
  IfBpProp,
  IfNativePropType,
  NativePropType,
} from './types'
export const bpPropKey = '__bpPropKey'
export const isBpProp = (val: unknown): val is BpProp<any, any, any> =>
  isObject(val) && !!(val as any)[bpPropKey]

export const definePropType = <T>(val: any): PropType<T> => val

export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends BpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: BpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): BpPropFinalized<Type, Value, Validator, Default, Required> => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isBpProp(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [bpPropKey]: true,
  }
  if (hasOwn(prop, 'default')) epProp.default = defaultValue
  return epProp
}
/**
 * _.fromPairs([['fred', 30], ['barney', 40]]);
 * // => { 'fred': 30, 'barney': 40 } 
*/
// fromPairs<T>(pairs: List<[PropertyName, T]> | null | undefined): Dictionary<T>;
//         /**
//          * @see _.fromPairs
//          */
// fromPairs(pairs: List<any[]> | null | undefined): Dictionary<any>;
export const fromEntries = (pairs) => {
  const result = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}

export const buildProps = <
  Props extends Record<
    string,
    | { [bpPropKey]: true }
    | NativePropType
    | BpPropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfBpProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], BpPropConvert<Props[K]>>
  >
} =>
  fromEntries(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any