import React from 'react';
import MainHeader from './MainHeader';
import '../../styles/Recommends.scss';

const Recommends = () => {
  return (
    <div id="recommends">
      <MainHeader name={'Recommends'} />
      <ul>
        <li>가요</li>
        <li>팝</li>
        <li>락</li>
        <li>알앤비</li>
      </ul>
    </div>
  );
};

export default Recommends;
