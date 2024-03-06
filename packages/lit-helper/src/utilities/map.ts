import type { RenderResult } from '@gecut/types';

// eslint-disable-next-line consistent-return
export function* map<T>(
    _this: unknown,
    items: Array<T> | undefined | null,
    f: (value: T) => RenderResult,
    loading?: RenderResult
): Generator<RenderResult, RenderResult | void, RenderResult> {
  if (items == null) {
    return loading;
  }

  for (const value of items) {
    yield f.call(_this, value);
  }
}
