import React from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';

// tslint:disable-next-line: no-empty
const handleMenuClick = () => { };
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      <Icon type="database" />
      Mysql - Table Sales Details
      </Menu.Item>
    <Menu.Item key="2">
      <Icon type="file-excel" />
      Excel - Installment Collections
      </Menu.Item>
    <Menu.Item key="3">
      <Icon type="dropbox" />
      Dropbox - User List
      </Menu.Item>
  </Menu>
);

const DatasourceSelector = () => (
  <Dropdown overlay={menu}>
    <Button style={{ width: '11.5rem', margin: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      Select Datasource
      <Icon type="caret-down" />
    </Button>
  </Dropdown>
);

export default DatasourceSelector;
