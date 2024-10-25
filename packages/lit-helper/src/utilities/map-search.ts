import objectPartial from '@gecut/utilities/object-partial.js';
import {untilMS} from '@gecut/utilities/wait/wait.js';

import type {ObjectBooleanize, RenderResult, UnknownRecord} from '@gecut/types';

// eslint-disable-next-line max-params, consistent-return
export async function* mapSearch<T extends UnknownRecord>(
  _this: unknown,
  items: T[] | undefined | null,
  query: string,
  searchParams: ObjectBooleanize<T>,
  f: (value: T) => RenderResult,
  notFound?: () => RenderResult,
  loading?: RenderResult,
): AsyncGenerator<RenderResult, any, RenderResult> {
  if (items == null) {
    return loading;
  }

  let findValues = 0;

  for (const value of items) {
    const queries = objectPartial(value, searchParams);
    const search = Object.values(queries).join(' ').toLowerCase();

    await untilMS(0);

    if (
      query
        .toLowerCase()
        .split(' ')
        .map((queryWord) => search.includes(queryWord))
        .reduce((p, c) => p && c, true)
    ) {
      findValues++;
      yield f.call(_this, value);
    }
  }

  if (findValues === 0 && notFound != null) {
    yield notFound();
  }
}
