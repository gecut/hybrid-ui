import type {MaybePromise, RenderResult} from '@gecut/types';

// eslint-disable-next-line max-params, consistent-return
export async function* mapFilter<T>(
  _this: unknown,
  items: T[] | undefined | null,
  filter: (item: T) => MaybePromise<boolean>,
  f: (value: T) => RenderResult,
  loading?: RenderResult,
): AsyncGenerator<RenderResult, RenderResult, RenderResult> {
  if (items == null) {
    return loading;
  }

  for (const value of items) {
    if ((await Promise.resolve(filter(value))) === true) {
      yield f.call(_this, value);
    }
  }
}
