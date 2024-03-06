import type { RenderResult } from '@gecut/types';

// eslint-disable-next-line consistent-return
export function* mapObject<T>(
  _this: unknown,
  items: Record<string, T> | undefined | null,
  f: (value: T, key: string) => RenderResult,
  loading?: RenderResult
): Generator<RenderResult, RenderResult, RenderResult> {
  if (items == null) {
    return loading;
  }

  for (const key in items) {
    if (Object.prototype.hasOwnProperty.call(items, key)) {
      yield f.call(_this, items[key], key);
    }
  }
}
