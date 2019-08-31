import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Tooltip } from 'antd';
import './Navigation.scss';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName={'active'}>
            <Tooltip placement="right" title={'dashboard'}>
              <Icon type="dashboard"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" activeClassName={'active'}>
            <Tooltip placement="right" title={'explore'}>
              <Icon type="pie-chart"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/share" activeClassName={'active'}>
            <Tooltip placement="right" title={'share'}>
              <Icon type="share-alt"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/datasource" activeClassName={'active'}>
            <Tooltip placement="right" title={'datasource'}>
              <Icon type="database"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/manage" activeClassName={'active'}>
            <Tooltip placement="right" title={'user management'}>
              <Icon type="user"/>
            </Tooltip>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName={'active'}>
            <Tooltip placement="right" title={'settings'}>
              <Icon type="setting"/>
            </Tooltip>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export { Navigation };
