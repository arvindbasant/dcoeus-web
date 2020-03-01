// import { EncodingQuery, isAutoCountQuery, isFieldQuery, ValueQuery } from 'compassql/build/src/query/encoding';
// import { FieldQuery } from 'compassql/build/src/query/encoding';
// import { ExpandedType } from 'compassql/build/src/query/expandedtype';
// import { isWildcard, SHORT_WILDCARD, Wildcard, WildcardProperty } from 'compassql/build/src/wildcard';
import { Axis } from 'vega-lite/build/src/axis';
import { Channel, NonPositionScaleChannel, PositionScaleChannel } from 'vega-lite/build/src/channel';
import { Legend } from 'vega-lite/build/src/legend';
import { Mark as VLMark } from 'vega-lite/build/src/mark';
import { Scale } from 'vega-lite/build/src/scale';
import { SortField, SortOrder } from 'vega-lite/build/src/sort';
import { StackOffset } from 'vega-lite/build/src/stack';
import { ShelfFunction } from './shelfFunction';
import { Type } from 'vega-lite/build/src/type';
import { ValueDef } from 'vega-lite/build/src/channeldef';

export type ShelfChannel = 'size' | 'color' | 'shape' | 'detail' | 'text' | 'x' | 'y' | 'row' | 'column';

export interface ShelfChannelId {
  channel: ShelfChannel;
}

export type ShelfId = ShelfChannelId;

export type ShelfMark = VLMark;

export type ShelfValueDef = ValueDef;
export type ShelfEncodingDef = ShelfFieldDef;

export interface ShelfFieldDef {
  field: string;
  type: Type;
  fn?: ShelfFunction;
  scale?: Scale;
  axis?: Axis;
  stack?: StackOffset;
  legend?: Legend;
  sort?: SortOrder | SortField;
  description?: string;
}

export type SpecificEncoding =
  {
    [P in PositionScaleChannel]?: ShelfFieldDef;
  } & {
    [P in NonPositionScaleChannel]?: ShelfEncodingDef
  } & {
    text?: ShelfEncodingDef,
    detail?: ShelfFieldDef,
    order?: ShelfFieldDef,
    row?: ShelfFieldDef,
    column?: ShelfFieldDef
    tooltip?: ShelfFieldDef | ShelfValueDef
  };

// export function fromEncodingQueries(encodings: EncodingQuery[]): { encoding: SpecificEncoding, anyEncodings: ShelfAnyEncodingDef[] } {
//   return encodings.reduce((encodingMixins, encQ) => {
//     if (isWildcard(encQ.channel)) {
//       encodingMixins.anyEncodings.push({
//         channel: encQ.channel,
//         ...fromEncodingQuery(encQ)
//       });
//     } else {
//       encodingMixins.encoding[encQ.channel] = fromEncodingQuery(encQ);
//     }

//     return encodingMixins;
//   }, { encoding: {}, anyEncodings: [] });
// }

// export function fromEncodingQuery(encQ: EncodingQuery): ShelfEncodingDef {
//   if (isFieldQuery(encQ)) {
//     return fromFieldQuery(encQ);
//   } else if (isAutoCountQuery(encQ)) {
//     throw Error('AutoCount Query not yet supported');
//   } else {
//     return fromValueQuery(encQ);
//   }
// }

// export function toEncodingQuery(encDef: ShelfEncodingDef, channel: Channel | SHORT_WILDCARD):
//   EncodingQuery {
//   if (isShelfFieldDef(encDef)) {
//     return toFieldQuery(encDef, channel);
//   }
//   return toValueQuery(encDef, channel);
// }

// export function toFieldQuery(fieldDef: ShelfFieldDef, channel: Channel | SHORT_WILDCARD): FieldQuery {
//   const { fn, ...fieldDefWithoutFn } = fieldDef;

//   return {
//     channel,
//     ...toFieldQueryFunctionMixins(fn),
//     ...fieldDefWithoutFn
//   };
// }

// export function fromFieldQuery(fieldQ: FieldQuery): ShelfFieldDef {
//   const { aggregate, bin, hasFn, timeUnit, field, scale, axis, legend, sort, description } = fieldQ;
//   let { type } = fieldQ;

//   if (isWildcard(type)) {
//     throw Error('Voyager does not support wildcard type');
//   } else if (type === 'ordinal') {
//     console.warn('Voyager does not support ordinal type yet, converting to nominal');
//     type = 'nominal';
//   }

//   const fn = fromFieldQueryFunctionMixins({ aggregate, bin, timeUnit, hasFn });

//   return {
//     ...(fn ? { fn } : {}),
//     field,
//     // Need to cast as TS2.3 isn't smart about this.
//     // Upgrading to TS2.4 would solve this issue but creates other issues instead.
//     type: type as ExpandedType,
//     ...(sort ? { sort } : {}),
//     ...(scale ? { scale: fromFieldQueryNestedProp(fieldQ, 'scale') } : {}),
//     ...(axis ? { axis: fromFieldQueryNestedProp(fieldQ, 'axis') } : {}),
//     ...(legend ? { legend: fromFieldQueryNestedProp(fieldQ, 'legend') } : {}),
//     ...(description ? { description } : {})
//   };
// }

// export function fromFieldQueryNestedProp<P extends 'scale' | 'axis' | 'legend'>(
//   fieldQ: FieldQuery, prop: P
// ): ShelfFieldDef[P] {
//   const propQ = fieldQ[prop];
//   if (!propQ) {
//     return undefined;
//   } else if (isWildcard(propQ)) {
//     throw Error(`Voyager does not support wildcard ${prop}`);
//   } else if (isBoolean(propQ)) {
//     throw Error(`Voyager does not support boolean ${prop}`);
//   } else {
//     Object.keys(propQ).forEach(nestedProp => {
//       if (isWildcard(propQ[nestedProp])) {
//         throw Error(`Voyager does not support wildcard ${prop} ${nestedProp}`);
//       }
//     });
//   }
//   // We already catch all the unsupported types above so here we can just cast
//   return propQ as ShelfFieldDef[P];
// }

// export function fromValueQuery(encQ: ValueQuery): ShelfValueDef {
//   if (isWildcard(encQ.value)) {
//     throw new Error('Voyager does not support wildcard value');
//   }

//   return {
//     value: encQ.value ? encQ.value : undefined // TODO: read vega-lite defaults when value is undefined
//   };
// }

// export function isShelfFieldDef(encDef: any): encDef is ShelfFieldDef {
//   return !!encDef.field;
// }

// export function isShelfValueDef(encDef: any): encDef is ShelfValueDef {
//   return !!encDef.value;
// }

// export function toValueQuery(valueDef: ShelfValueDef, channel: Channel | SHORT_WILDCARD): ValueQuery {
//   return {
//     channel,
//     value: valueDef.value ? valueDef.value : undefined
//   };
// }
