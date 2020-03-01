import React, { useEffect } from 'react';
import Toolbar from './Toolbar';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MarkPicker from './MarkPicker';
import { Pagination, Icon } from 'antd';
import FieldList from './FieldList';
import DatasourceSelector from './DatasourcsSelector';
import ChartHeader from './ChartHeader';
import BookmarkList from './BookmarkList';
import { TopLevelSpec } from 'vega-lite';
import EncodingPane from './EncodingPane';
import './Explore.scss';
import { useStore } from 'context';
import { DatasetActions } from 'context/dataset/datasetActions';
import { Chart } from './Chart';
import Axios from 'axios';
import { VegaLite } from 'components/VegaLite';

// function createQueryAttr(spec: ShelfUnitSpec) {
//   for (let val in spec.encoding) {
//     const z = spec.encoding[val];
//   }
// }

export default function Explore() {
  const { state, dispatch } = useStore();
  const { shelfSpec, dataset } = state;
  useEffect(() => {
    const data = {
      datasource: 'cars',
      fields: [
        {
          type: 'nominal',
          name: 'origin',
          fn: ''
        },
        {
          type: 'quantitative',
          name: 'horsepower',
          fn: '',
        },
      ]
    };
    const fetchData = async () => {
      Axios.defaults.baseURL = 'http://localhost:8080';
      const result = await Axios.post('/data', data);
      dispatch(DatasetActions.loadData({ values: result.data.table }));
      console.log('result', result);
    };
    fetchData();
  }, [shelfSpec.encoding]);

  const spec = { ...shelfSpec, data: dataset.data } as TopLevelSpec;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="explore">
        <div className="explore__toolbar">
          <Toolbar />
        </div>
        <div className="explore__main">
          <div className={'explore__main__first'}>
            <DatasourceSelector />
            <FieldList />
          </div>
          <div className="explore__main__second">
            <div className={'type-wrapper'}>
              <div className={'group-field-wrapper-title'}>
                <Icon type="project" />Group
              </div>
              <EncodingPane isNonPosinalEncoding={true} spec={shelfSpec} />
            </div>
            <div className={'expression-wrapper'}>
              <div className={'filter-wrapper-title'}>
                <Icon type="filter" />Filters
              </div>
              <div>
                <div className={'placeholder-text'}>drop items here to apply filter</div>
              </div>
            </div>
          </div>
          <div className={'explore__main__third'}>
            <div className="explore__main__third__axis">
              <EncodingPane isNonPosinalEncoding={false} spec={shelfSpec} />
            </div>
            <ChartHeader />
            <div className="explore__main__third__main">
              <div className="explore__main__third__main__wrapper">
                <MarkPicker />
                <div className="explore__main__third__main__wrapper__chart">
                  <div className="explore__main__third__main__wrapper__chart__plot">
                    {dataset && <VegaLite spec={spec} renderer="svg" />}
                    {/* {dataset && <Chart spec={spec} />} */}

                  </div>
                  <div className="explore__main__third__main__wrapper__chart__pager">
                    <Pagination defaultCurrent={1} total={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="explore__main__last">
            <BookmarkList />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
