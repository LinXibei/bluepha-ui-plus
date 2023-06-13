import { isArray, isObject, isString } from "@vue/shared";
export {
  isVNode,
} from "vue";
export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from "@vue/shared";

export const isUndefined = (e: unknown): e is undefined => e === undefined;

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element
}

export const isEmpty = (val: unknown) => 
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length);

export const isStringOrNumber = (val: unknown): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
}
