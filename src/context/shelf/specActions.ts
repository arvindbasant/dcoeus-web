import { ActionUnion } from 'context/util/actionUnion';
import { ShelfMark, ShelfId, ShelfFieldDef, SHORT_WILDCARD, ShelfValueDef } from 'models/shelf/spec';
import { createAction } from 'context/util/createAction';
import { ShelfFunction } from 'models/shelf/spec/shelfFunction';
import { TopLevelSpec } from 'vega-lite';

export const SpecActions = {
  markChange: (mark: ShelfMark | SHORT_WILDCARD) => createAction('SPEC_MARK_CHANGE', { mark }),
  specFieldAdd: (shelfId: ShelfId, fieldDef: ShelfFieldDef, replace: boolean) => createAction('SPEC_FIELD_ADD', { shelfId, fieldDef, replace }),
  specFieldRemove: (shelfId: ShelfId) => createAction('SPEC_FIELD_REMOVE', shelfId),
  specFieldMove: (from: ShelfId, to: ShelfId) => createAction('SPEC_FIELD_MOVE', { from, to }),
  specValueChange: (shelfId: ShelfId, valueDef: ShelfValueDef) => createAction('SPEC_VALUE_CHANGE', { shelfId, valueDef }),
  specFunctionChange: (shelfId: ShelfId, fn: ShelfFunction) => createAction('SPEC_FUNCTION_CHANGE', { shelfId, fn }),
  specLoad: (spec: TopLevelSpec) => createAction('SPEC_LOAD', { spec }),
  specClear: () => createAction('SPEC_CLEAR'),
  specFieldPropChange: <P extends 'sort' | 'stack'>(
    shelfId: ShelfId,
    prop: P,
    value: ShelfFieldDef[P],
  ) => createAction('SPEC_FIELD_PROP_CHANGE', { shelfId, prop, value }),
  specFieldNestedPropChange: <P extends 'scale' | 'axis' | 'legend', N extends (keyof ShelfFieldDef[P])>(
    shelfId: ShelfId,
    prop: P,
    nestedProp: N,
    value: ShelfFieldDef[P][N],
  ) => createAction('SPEC_FIELD_NESTED_PROP_CHANGE', { shelfId, prop, nestedProp, value }),
};

export type SpecActions = ActionUnion<typeof SpecActions>;
