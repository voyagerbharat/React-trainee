import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useMediaQuery } from '../../../misc/Custom-Hooks';
import RoomInfoBtnModel from './RoomInfoBtnModel';

const Top = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <div>
      <div className="d-flex justify-content-between align-itmes-center">
        <h4 className="text-disapper -flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap mt-3">todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between alig-items-center">
        <span>todo</span>
        <RoomInfoBtnModel />
      </div>
    </div>
  );
};

export default memo(Top);
