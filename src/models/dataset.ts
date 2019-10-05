import { InlineData } from 'vega-lite/build/src/data';
import { ShelfFieldDef } from './shelf/spec';

export interface Dataset {
  data?: InlineData;
  isLoading: boolean;
  name: string;
  tableSchema: ShelfFieldDef[];
}

export const DEFAULT_DATASET: Dataset = {
  isLoading: false,
  name: 'cars',
  tableSchema: [
    { field: 'cylinders', type: 'nominal' },
    { field: 'Name', type: 'nominal' },
    { field: 'Origin', type: 'nominal' },
    { field: 'Year', type: 'temporal' },
    { field: 'Acceleration', type: 'quantitative' },
    { field: 'Displacement', type: 'quantitative' },
    { field: 'Horsepower', type: 'quantitative' },
    { field: 'Miles per gallon', type: 'quantitative' },
    { field: 'Weight in lbs', type: 'quantitative' },
    { field: 'Pollution rating', type: 'ordinal' },
    { field: 'Count', type: 'quantitative' },
  ],
};