import { repeat as litRepeat } from 'lit/directives/repeat.js';

import type { RenderResult } from '@gecut/types';

export function repeat<T>(
    _this: unknown,
    items: Record<string, T> | undefined | null,
    f: (value: T, key: string) => RenderResult,
    loading?: RenderResult
): unknown {
  if (items == null) {
    return loading;
  }

  return litRepeat(
      Object.keys(items),
      (key) => key,
      (key) => f.call(_this, items[key], key)
  );
}
