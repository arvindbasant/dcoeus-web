import React from 'react';
import Toolbar from './Toolbar';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './Explore.scss';
import ChartSelector from './ChartSelector';
import { Pagination, Icon, Collapse } from 'antd';
import ColumnList from './ColumnList';
import DatasourceSelector from './DatasourcsSelector';
import ChartHeader from './ChartHeader';
import FieldDropper from './FieldDropper';
import BookmarkList from './BookmarkList';

export default function Explore() {
  const { Panel } = Collapse;
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="explore">
        <div className="explore__toolbar">
          <Toolbar />
        </div>
        <div className="explore__main">
          <div className={'explore__main__first'}>
            <DatasourceSelector />
            <ColumnList />
          </div>
          <div className="explore__main__second">
            <div className={'type-wrapper'}>
              <div className={'group-field-wrapper-title'}>
                <Icon type="project" />Group
              </div>

              <FieldDropper name={'Color'} />
              <FieldDropper name={'Size'} />
              <FieldDropper name={'Shape'} />
              <FieldDropper name={'Detail'} />
              <FieldDropper name={'Text'} />
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
              <FieldDropper name={'Columns'} icon={{ name: 'menu', style: { transform: 'rotate(90deg)' } }} />
              <FieldDropper name={'Rows'} icon={{ name: 'menu' }} />
            </div>
            <ChartHeader />
            <div className="explore__main__third__main">
              <div className="explore__main__third__main__wrapper">
                <ChartSelector />
                <div className="explore__main__third__main__wrapper__chart">
                  <div className="explore__main__third__main__wrapper__chart__plot">plot</div>
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
