import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MarkPicker from './MarkPicker';
import { Pagination, Icon, Collapse } from 'antd';
import FieldList from './FieldList';
import DatasourceSelector from './DatasourcsSelector';
import ChartHeader from './ChartHeader';
import BookmarkList from './BookmarkList';
import { VegaLite } from 'components/VegaLite';
import { TopLevelSpec } from 'vega-lite';
import EncodingPane from './EncodingPane';
import axios from 'axios';
import './Explore.scss';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/types';
import { ShelfUnitSpec, SpecificEncoding } from 'models/shelf/spec';

// function createQueryAttr(spec: ShelfUnitSpec) {
//   for (let val in spec.encoding) {
//     const z = spec.encoding[val];
//   }
// }

export default function Explore() {
  const chartSpec = useSelector((state: ApplicationState) => state.spec);
  const [data, setData] = useState({ values: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/cars',
      );
      setData({ values: result.data.table });
    };
    fetchData();
  }, [chartSpec.encoding]);
  const spec = { ...chartSpec, data } as TopLevelSpec;
  console.log('spec', spec);
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
              <EncodingPane isNonPosinalEncoding={true} spec={chartSpec} />
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
              <EncodingPane isNonPosinalEncoding={false} spec={chartSpec} />
            </div>
            <ChartHeader />
            <div className="explore__main__third__main">
              <div className="explore__main__third__main__wrapper">
                <MarkPicker />
                <div className="explore__main__third__main__wrapper__chart">
                  <div className="explore__main__third__main__wrapper__chart__plot">
                    {data.values.length > 0 && <VegaLite spec={spec} renderer="svg" />}
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
