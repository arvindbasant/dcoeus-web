import { ShelfUnitSpec, DEFAULT_SHELF_UNIT_SPEC } from 'models/shelf/spec';
import { Dataset, DEFAULT_DATASET } from 'models/dataset';

export interface ApplicationState {
  spec: ShelfUnitSpec;
  dataset: Dataset;
}

export const DEFAULT_APPLICATION_STATE = {
  spec: DEFAULT_SHELF_UNIT_SPEC,
  dataset: DEFAULT_DATASET,
};