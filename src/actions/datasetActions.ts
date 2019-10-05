import { createAction } from './util/createAction';
import { ActionUnion } from './util/actionUnion';
import { ShelfFieldDef } from 'models/shelf/spec';

export const DatasetActions = {
  loadData: () => createAction('@@dataset/LOAD_DATA'),
  updateTableSchema: (field: string, fieldDefParam: { [k in keyof ShelfFieldDef]?: ShelfFieldDef[k] }) => createAction('@@data/UPDATE_TABLE_SCHEMA', { field, fieldDefParam }),
};

export type DatasetActions = ActionUnion<typeof DatasetActions>;