import React, { useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/Custom-Hooks';

const InputFilesType = '.png, .jpeg, .jpg';
const acceptedFileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileType.includes(file.type);
const AvatarUploadbtn = () => {
  const { isOpen, open, close } = useModalState();
  // eslint-disable-next-line no-unused-vars
  const [img, setimg] = useState(null);
  const onInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setimg(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label htmlFor="avatar-upload">
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={InputFilesType}
            onChange={onInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new Avatar
            </Button>
            ;
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadbtn;
