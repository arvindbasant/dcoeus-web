import { ExpandedType } from 'compassql/build/src/query/expandedtype';
import { isAggregateOp, ArgmaxDef, ArgminDef } from 'vega-lite/build/src/aggregate';
import { isTimeUnit, TimeUnit } from 'vega-lite/build/src/timeunit';
import { AggregateOp } from 'vega-typings';
import { Wildcard, isWildcard, WildcardProperty, SHORT_WILDCARD, isShortWildcard } from 'compassql/build/src/wildcard';
import { BinQuery } from 'compassql/build/src/query/encoding';
import { DEFAULT_QUERY_CONFIG } from 'compassql/build/src/config';
import { contains } from 'vega-lite/build/src/util';

export type ShelfFunction = AggregateOp | 'bin' | TimeUnit | undefined;

const QUANTITATIVE_FUNCTIONS: ShelfFunction[] = [undefined, 'bin', 'min', 'max', 'mean', 'median', 'sum'];

const TEMPORAL_FUNCTIONS = [undefined, 'yearmonthdate', 'year', 'month', 'quarter', 'date', 'day', 'hours', 'minutes', 'seconds', 'milliseconds'];

export function getSupportedFunction(type: ExpandedType) {
  switch (type) {
    case 'quantitative':
      return QUANTITATIVE_FUNCTIONS;

    case 'temporal':
      return TEMPORAL_FUNCTIONS;
  }
  return [];
}

export function isShelfFunction(fn: string | undefined): fn is ShelfFunction {
  return fn === 'bin' || fn === undefined || fn === null || isAggregateOp(fn) || isTimeUnit(fn); // check null for duplicate
}

export type FieldQueryFunctionMixins = {
  aggregate?: WildcardProperty<AggregateOp | undefined>;
  timeUnit?: WildcardProperty<TimeUnit | undefined>;
  hasFn?: boolean;
  bin?: boolean | BinQuery | SHORT_WILDCARD;
};

export function toFieldQueryFunctionMixins(fn: ShelfFunction | Wildcard<ShelfFunction>): FieldQueryFunctionMixins {

  if (isWildcard(fn)) {
    const fns = fn.enum; // sort a new copy of the array

    const aggregates: AggregateOp[] = [];
    const timeUnits: TimeUnit[] = [];
    let hasBin: boolean = false;
    let hasNoFn: boolean = false;
    if (fns) {
      for (const f of fns) {
        if (f) {
          if (isAggregateOp(f)) {
            aggregates.push(f);
          } else if (isTimeUnit(f)) {
            timeUnits.push(f);
          } else if (f === 'bin') {
            hasBin = true;
          } else if (f === undefined || f === null) {
            // Check for null just in case things get copied
            hasNoFn = true;
          } else {
            throw new Error('Invalid function ' + f);
          }
        }
      }
    }

    const functionTypeCount = (aggregates.length > 0 ? 1 : 0) + (timeUnits.length > 0 ? 1 : 0) + (hasBin ? 1 : 0);

    const enumerateUndefined = functionTypeCount > 1 || hasNoFn;
    const baseEnum: undefined[] = enumerateUndefined ? [undefined] : [];
    const hasFn = !hasNoFn;

    const mixins: FieldQueryFunctionMixins = {
      ...(aggregates.length > 0 ? {
        aggregate: { enum: [...baseEnum, ...aggregates] }
      } : {}),

      ...(timeUnits.length > 0 ? {
        timeUnit: { enum: [...baseEnum, ...timeUnits] }
      } : {}),

      ...(hasBin ? {
        bin: {
          enum: (enumerateUndefined ? [false] : []).concat([true])
          // TODO: deal with bin params
        }
      } : {}),
      ...(hasFn ? { hasFn } : {})
    };

    if (!mixins.aggregate && !mixins.timeUnit && !mixins.bin) {
      // For enum: [undefined], return this special mixins
      return {
        bin: {
          enum: [false]
        },
        timeUnit: {
          enum: [undefined]
        },
        aggregate: {
          enum: [undefined]
        }
      };
    }

    return mixins;
  } else if (fn && isAggregateOp(fn)) {
    return { aggregate: fn };
  } else if (fn === 'bin') {
    return { bin: true };
  } else if (fn && isTimeUnit(fn)) {
    return { timeUnit: fn };
  }
  return {};
}

function excludeUndefined(fn: string | undefined | ArgmaxDef | ArgminDef) {
  if (!isShelfFunction) {
    console.warn(`Invalid function ${fn} dropped`);
    return false;
  }
  return fn !== undefined && fn !== null;
}

export function fromFieldQueryFunctionMixins(
  fieldQParts: FieldQueryFunctionMixins
): ShelfFunction | Wildcard<ShelfFunction> {

  // FIXME make this a parameter
  const config = DEFAULT_QUERY_CONFIG;

  const { aggregate, bin, hasFn, timeUnit } = fieldQParts;

  let fns: ShelfFunction[] = [];
  let fn: ShelfFunction;
  let hasUndefinedInEnum = false;

  if (bin) {
    if (isWildcard(bin)) {
      const bins = isShortWildcard(bin) ? [true, false] : bin.enum;
      fns = fns.concat(contains(bins!, true) ? ['bin'] : []);
      hasUndefinedInEnum = hasUndefinedInEnum || contains(bins!, false);
    } else if (bin) {
      fn = 'bin';
    }
  }
  if (aggregate) {
    if (isWildcard(aggregate)) {
      const aggregates = isShortWildcard(aggregate) ? config.enum!.aggregate : aggregate.enum;
      if (aggregates) {
        fns = fns.concat(
          // We already filter composite aggregate function so it is fine to cast here
          // as the only thing left would be AggregateOp (but TS would not know that)
          aggregates.filter(excludeUndefined) as AggregateOp[]
        );
        hasUndefinedInEnum = hasUndefinedInEnum || contains(aggregates, undefined);
      }

    } else if (!fn) {
      fn = aggregate;
    } else {
      throw Error(`Invalid field with function ${fn} and ${aggregate}`);
    }
  }

  if (timeUnit) {
    if (isWildcard(timeUnit)) {
      const timeUnits = isShortWildcard(timeUnit) ? config.enum!.timeUnit : timeUnit.enum;
      fns = fns.concat(timeUnits!.filter(excludeUndefined));
      hasUndefinedInEnum = hasUndefinedInEnum || contains(timeUnits!, undefined);
    } else if (!fn) {
      fn = timeUnit;
    } else {
      throw Error(`Invalid field with function ${fn} and ${timeUnit}`);
    }
  }

  if (fn) {
    return fn;
  }

  if (hasUndefinedInEnum && !hasFn) {
    // prepend undefined
    fns.unshift(undefined);
  }

  if (fns.length > 0) {
    return { enum: fns };
  }
  return undefined;
}
