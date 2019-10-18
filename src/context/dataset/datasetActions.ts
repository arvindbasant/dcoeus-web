import { createAction } from '../util/createAction';
import { ActionUnion } from '../util/actionUnion';
import { ShelfFieldDef } from 'models/shelf/spec';
import { InlineData } from 'vega-lite/build/src/data';

export const DatasetActions = {
  loadData: (data: InlineData) => createAction('@@dataset/LOAD_DATA', data),
  updateTableSchema: (field: string, fieldDefParam: { [k in keyof ShelfFieldDef]?: ShelfFieldDef[k] }) => createAction('@@data/UPDATE_TABLE_SCHEMA', { field, fieldDefParam }),
};

export type DatasetActions = ActionUnion<typeof DatasetActions>;