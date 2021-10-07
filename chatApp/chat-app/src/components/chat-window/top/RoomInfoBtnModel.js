import React, { memo } from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useModalState } from '../../../misc/Custom-Hooks';

const RoomInfoBtnModel = () => {
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);
  // eslint-disable-next-line no-unused-vars
  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room information
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoBtnModel);
