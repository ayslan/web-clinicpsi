// https://github.com/Hotell/rex-tils
// https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

/**
 * use this type definition instead of `Function` type constructor
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * simple alias to save you keystrokes when defining JS typed object maps
 */
export interface IStringMap<T> {
  [key: string]: T;
}

/**
 * Action can exists only in 2 shapes. type only or type with payload
 */
export type Action<T extends string = string, P = void> = P extends void
  ? Readonly<{ type: T }>
  : Readonly<{ type: T; payload: P }>;

/**
 * Get Actions types union from Action creators object.
 * It is recommended to export them under the same name as your Actions object, to leverage token merging
 *
 * @example
 *
 * ```ts
 * const SET_AGE = '[core] set age'
 * const SET_NAME = '[core] set name'
 * const RELOAD_URL = '[router] Reload Page'
 *
 * export const Actions = {
 *  setAge: (age: number) => createAction(SET_AGE, age),
 *  setName: (name: string) => createAction(SET_NAME, name),
 *  reloadUrl: () => createAction(RELOAD_URL),
 * }
 *
 * // $ExpectType {Readonly<{ type: "[core] set age"; payload: number; }> |
 *      Readonly<{ type: "[core] set name"; payload: string; }> | Readonly<{ type: "[router] Reload Page"; }>}
 * export type Actions = ActionsUnion<typeof Actions>
 * ```
 */
export type ActionsUnion<A extends IStringMap<AnyFunction>> = ReturnType<A[keyof A]>;

/**
 * Gets particular Action type from ActionsUnion
 *
 * @example
 *
 * ```ts
 * const SET_AGE = '[core] set age'
 * const SET_NAME = '[core] set name'
 *
 * export const Actions = {
 *  setAge: (age: number) => createAction(SET_AGE, age),
 *  etName: (name: string) => createAction(SET_NAME, name),
 * }
 *
 * export type Actions = ActionsUnion<typeof Actions>
 *
 * // $ExpectType {type: '[core] set age', payload: 23}
 * type AgeAction = ActionsOfType<Actions, typeof SET_AGE>
 * ```
 */
export type ActionsOfType<
  ActionUnion,
  ActionType extends string
> = ActionUnion extends Action<ActionType> ? ActionUnion : never;

export function createAction<T extends string>(type: T): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P>;

export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}
