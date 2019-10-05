import React, { useState } from 'react';
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

import './Explore.scss';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store/types';

export default function Explore() {
  const { Panel } = Collapse;
  const chartSpec = useSelector((state: ApplicationState) => state.spec);
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const customPanelStyle = {
    // background: '#f7f7f7',
    // borderBottom: '0.075rem solid #e7e9ed',
    overflow: 'hidden',
    border: 'none'
  };

  const spec1 = {
    'description': 'A simple bar chart with embedded data.',
    'mark': 'bar',
    'data': {
      'values': [
        { 'a': 'A', 'b': 20 }, { 'a': 'B', 'b': 34 }, { 'a': 'C', 'b': 55 },
        { 'a': 'D', 'b': 19 }, { 'a': 'E', 'b': 40 }, { 'a': 'F', 'b': 34 },
        { 'a': 'G', 'b': 91 }, { 'a': 'H', 'b': 78 }, { 'a': 'I', 'b': 25 }
      ]
    },
    'encoding': {
      'x': { 'field': 'a', 'type': 'ordinal' },
      'y': { 'field': 'b', 'type': 'quantitative' }
    }
  } as TopLevelSpec;

  const spec = {
    'description': 'A simple bar chart with embedded data.',
    'data': {
      'name': 'tbl',
      'values': [
        { 'a': 'a', 'b': 28 },
        { 'a': 'B', 'b': 55 },
        { 'a': 'C', 'b': 43 },
        { 'a': 'D', 'b': 91 },
        { 'a': 'E', 'b': 81 },
        { 'a': 'F', 'b': 53 },
        { 'a': 'G', 'b': 19 },
        { 'a': 'H', 'b': 87 },
        { 'a': 'I', 'b': 52 }
      ]
    },
    'mark': 'bar',
    'encoding': {
      'x': { 'field': 'a', 'type': 'ordinal' },
      'y': { 'field': 'b', 'type': 'quantitative' }
    }
  } as TopLevelSpec;

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
                    <VegaLite spec={spec} renderer="svg" />
                    {/* <Chart chartSpec={spec} /> */}
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
