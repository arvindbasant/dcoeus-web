import React from 'react';
import { Icon } from 'antd';
import './BookmarkList.scss';
import { IconProps } from 'antd/lib/icon';

const BookmarkSvg = () => (
  <svg width="25" height="31" viewBox="0 0 25 31">
    <path fill="#e7e9ed" fillRule="nonzero" d="M0 0h25v31l-12.5-9.3L0 31V0zm3.125 3.1v21.7l9.375-6.975 9.375 6.975V3.1H3.125z" />
  </svg>
);

const BookmarkIcon = (props: IconProps) => <Icon component={BookmarkSvg} {...props} />;

const BookmarkList = () => (
  <div className="bookmark-list">
    <div className="placeholder-text"><BookmarkIcon style={{ fontSize: '1.5rem', color: '#f5f5f5' }} />your bookmark charts</div>
  </div>
);

export default BookmarkList;