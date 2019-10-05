import { isAggregateOp, ArgmaxDef, ArgminDef } from 'vega-lite/build/src/aggregate';
import { isTimeUnit, TimeUnit } from 'vega-lite/build/src/timeunit';
import { AggregateOp } from 'vega-typings';
import { contains } from 'vega-lite/build/src/util';
import { Type } from 'vega-lite/build/src/type';
import { FacetedCompositeEncoding } from 'vega-lite/build/src/compositemark';

export type ShelfFunction = AggregateOp | 'bin' | TimeUnit;

const QUANTITATIVE_FUNCTIONS: ShelfFunction[] = ['bin', 'min', 'max', 'mean', 'median', 'sum'];

const TEMPORAL_FUNCTIONS: ShelfFunction[] = ['yearmonthdate', 'year', 'month', 'quarter', 'date', 'day', 'hours', 'minutes', 'seconds', 'milliseconds'];

export function getSupportedFunction(type: Type): ShelfFunction[] {
  switch (type) {
    case 'quantitative':
      return QUANTITATIVE_FUNCTIONS;

    case 'temporal':
      return TEMPORAL_FUNCTIONS;
  }
  return [];
}

// export function isShelfFunction(fn: string | undefined): fn is ShelfFunction {
//   return fn === 'bin' || fn === undefined || fn === null || isAggregateOp(fn) || isTimeUnit(fn); // check null for duplicate
// }

// export type FieldQueryFunctionMixins = {
//   aggregate?: AggregateOp;
//   timeUnit?: TimeUnit;
//   bin?: boolean;
// };

// export function toFieldQueryFunctionMixins(fn: ShelfFunction): FieldQueryFunctionMixins {
//   if (isAggregateOp(fn)) {
//     return { aggregate: fn };
//   } else if (fn === 'bin') {
//     return { bin: true };
//   } else if (isTimeUnit(fn)) {
//     return { timeUnit: fn };
//   }
//   return {};
// }

// export function fromFieldQueryFunctionMixins(
//   fieldQParts: FieldQueryFunctionMixins
// ): ShelfFunction | Wildcard<ShelfFunction> {

//   // FIXME make this a parameter
//   const config = DEFAULT_QUERY_CONFIG;

//   const { aggregate, bin, hasFn, timeUnit } = fieldQParts;

//   let fns: ShelfFunction[] = [];
//   let fn: ShelfFunction;
//   let hasUndefinedInEnum = false;

//   if (bin) {
//     if (isWildcard(bin)) {
//       const bins = isShortWildcard(bin) ? [true, false] : bin.enum;
//       fns = fns.concat(contains(bins!, true) ? ['bin'] : []);
//       hasUndefinedInEnum = hasUndefinedInEnum || contains(bins!, false);
//     } else if (bin) {
//       fn = 'bin';
//     }
//   }
//   if (aggregate) {
//     if (isWildcard(aggregate)) {
//       const aggregates = isShortWildcard(aggregate) ? config.enum!.aggregate : aggregate.enum;
//       if (aggregates) {
//         fns = fns.concat(
//           // We already filter composite aggregate function so it is fine to cast here
//           // as the only thing left would be AggregateOp (but TS would not know that)
//           aggregates.filter(excludeUndefined) as AggregateOp[]
//         );
//         hasUndefinedInEnum = hasUndefinedInEnum || contains(aggregates, undefined);
//       }

//     } else if (!fn) {
//       fn = aggregate;
//     } else {
//       throw Error(`Invalid field with function ${fn} and ${aggregate}`);
//     }
//   }

//   if (timeUnit) {
//     if (isWildcard(timeUnit)) {
//       const timeUnits = isShortWildcard(timeUnit) ? config.enum!.timeUnit : timeUnit.enum;
//       fns = fns.concat(timeUnits!.filter(excludeUndefined));
//       hasUndefinedInEnum = hasUndefinedInEnum || contains(timeUnits!, undefined);
//     } else if (!fn) {
//       fn = timeUnit;
//     } else {
//       throw Error(`Invalid field with function ${fn} and ${timeUnit}`);
//     }
//   }

//   if (fn) {
//     return fn;
//   }

//   if (hasUndefinedInEnum && !hasFn) {
//     // prepend undefined
//     fns.unshift(undefined);
//   }

//   if (fns.length > 0) {
//     return { enum: fns };
//   }
//   return undefined;
// }
