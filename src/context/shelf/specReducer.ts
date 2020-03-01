import { ShelfUnitSpec, DEFAULT_SHELF_UNIT_SPEC, ShelfId, ShelfFieldDef } from 'models/shelf/spec';
import { SpecActions } from 'context/shelf/specActions';
import { FieldDef, ValueDef, Value } from 'vega-lite/build/src/channeldef';
import { Reducer } from 'react';

const shelfSpecReducer: Reducer<ShelfUnitSpec, SpecActions> = (
  shelfSpec: Readonly<ShelfUnitSpec> = DEFAULT_SHELF_UNIT_SPEC,
  action: SpecActions
): ShelfUnitSpec => {
  switch (action.type) {
    case 'SPEC_CLEAR':
      return DEFAULT_SHELF_UNIT_SPEC;
    case 'SPEC_MARK_CHANGE':
      const mark = action.payload.mark;
      return {
        ...shelfSpec,
        mark,
      };
    case 'SPEC_FIELD_ADD':
      const { shelfId, fieldDef, replace } = action.payload;
      return addEncoding(shelfSpec, shelfId, fieldDef, replace);
    case 'SPEC_FIELD_REMOVE':
      return removeEncoding(shelfSpec, action.payload).shelf;
    case 'SPEC_FIELD_MOVE': {
      const { to, from } = action.payload;

      const { fieldDef: fieldDefFrom, shelf: removedShelf1 } = removeEncoding(shelfSpec, from);
      const { fieldDef: fieldDefTo, shelf: removedShelf2 } = removeEncoding(removedShelf1, to);

      const addedShelf1 = addEncoding(removedShelf2, to, fieldDefFrom, false);
      const addedShelf2 = addEncoding(addedShelf1, from, fieldDefTo, false);

      return addedShelf2;
    }
    case 'SPEC_VALUE_CHANGE': {
      // tslint:disable-next-line: no-shadowed-variable
      const { shelfId, valueDef } = action.payload;
      return {
        ...shelfSpec,
        encoding: {
          ...shelfSpec.encoding,
          [shelfId.channel as any]: { value: valueDef.value }
        }
      };
    }
    case 'SPEC_FUNCTION_CHANGE': {
      // tslint:disable-next-line: no-shadowed-variable
      const { shelfId, fn } = action.payload;
      // tslint:disable-next-line: no-shadowed-variable
      return modifyEncoding(shelfSpec, shelfId, (fieldDef: Readonly<ShelfFieldDef>) => {
        return {
          ...fieldDef,
          fn,
        };
      });
    }
  }
  return shelfSpec;
};

function addEncoding(shelf: Readonly<ShelfUnitSpec>, shelfId: ShelfId, fieldDef: ShelfFieldDef | undefined | ValueDef, replace: boolean) {
  if (!fieldDef) {
    return shelf;
  } else {
    return {
      ...shelf,
      encoding: {
        ...shelf.encoding,
        [shelfId.channel]: fieldDef
      }
    };
  }
}

type ShelfFieldDefModifier<T extends ShelfFieldDef> = (fieldDef: Readonly<T>) => T;
export type AnyFieldDef = ShelfFieldDef | FieldDef<any>;

function modifyEncoding(shelf: Readonly<ShelfUnitSpec>, shelfId: ShelfId, modifier: ShelfFieldDefModifier<any>) {
  return {
    ...shelf,
    encoding: {
      ...shelf.encoding,
      [shelfId.channel]: modifier(shelf.encoding[shelfId.channel]!)
    }
  };
}

function removeEncoding(shelf: Readonly<ShelfUnitSpec>, shelfId: ShelfId): { fieldDef: ShelfFieldDef | ValueDef<Value> | undefined, shelf: Readonly<ShelfUnitSpec> } {
  const { [shelfId.channel]: fieldDef, ...encoding } = shelf.encoding;
  return {
    fieldDef,
    shelf: {
      ...shelf,
      encoding,
    }
  };
}

export default shelfSpecReducer;

// export function modifyFieldProp(
//   fieldDef: Readonly<AnyFieldDef>,
//   prop: string,
//   value: any
// ): Readonly<AnyFieldDef> {
//   const { [prop]: _oldProp, ...fieldDefWithoutProp } = fieldDef;
//   return {
//     ...fieldDefWithoutProp,
//     ...(value !== undefined ? { [prop]: value } : {})
//   };
// }

// export function modifyNestedFieldProp(
//   fieldDef: Readonly<AnyFieldDef>,
//   prop: string,
//   nestedProp: string,
//   value: any
// ): Readonly<AnyFieldDef> {
//   const { [prop]: oldParent, ...fieldDefWithoutProp } = fieldDef;
//   const { [nestedProp]: _oldValue, ...parentWithoutNestedProp } = oldParent || {};
//   const parent = {
//     ...parentWithoutNestedProp,
//     ...(value !== undefined ? { [nestedProp]: value } : {})
//   };
//   return {
//     ...fieldDefWithoutProp,
//     ...(Object.keys(parent).length > 0 ? { [prop]: parent } : {})
//   };
// }