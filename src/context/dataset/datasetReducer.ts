import { DEFAULT_DATASET, Dataset } from 'models/dataset';
import { DatasetActions } from 'context/dataset/datasetActions';
import { ShelfFieldDef } from 'models/shelf/spec';

export function datasetReducer(
  data: Dataset = DEFAULT_DATASET,
  action: DatasetActions): Dataset {
  switch (action.type) {
    case '@@dataset/LOAD_DATA':
      return { ...DEFAULT_DATASET, data: action.payload };
    case '@@data/UPDATE_TABLE_SCHEMA':
      const { field, fieldDefParam } = action.payload;
      return { ...data, tableSchema: updateTableSchema(data.tableSchema, field, fieldDefParam) };
    default:
      return data;
  }
}

function updateTableSchema(
  tableSchema: ShelfFieldDef[],
  field: string,
  fieldDefParam: { [k in keyof ShelfFieldDef]?: ShelfFieldDef[k] },
): ShelfFieldDef[] {
  return tableSchema.map(fieldDef => {
    if (fieldDef.field === field) {
      return { ...fieldDef, ...fieldDefParam };
    }
    return fieldDef;
  });
}
