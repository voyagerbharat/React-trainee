import React, { useState, useRef } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/Custom-Hooks';
import ProfileAvatar from './Avatar';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/Profile.context';

const InputFilesType = '.png, .jpeg, .jpg';
const acceptedFileType = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = file => acceptedFileType.includes(file.type);

// Converting canvas (Image) to Blob(binary representation of Image) that we can upload to storage
const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File Process Failed'));
      }
    });
  });
};

const AvatarUploadbtn = () => {
  const { isOpen, open, close } = useModalState();
  // eslint-disable-next-line no-unused-vars
  const [img, setimg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const avatorEditorRef = useRef();

  const { profile } = useProfile();
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

  // Uploading Avatar - first we put it in storage for certain profile and
  // then we link that url to that user in database
  const onUploadClick = async () => {
    const canvas = avatorEditorRef.current.getImageScaledToCanvas();
    setisLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');
      const uploadAvatar = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age${3600 * 24 * 3}`, // caching the image to browser for 3 days
      });
      const downloadUrl = await uploadAvatar.ref.getDownloadURL(); // getting url for the photo under storage
      const useravatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');
      useravatarRef.set(downloadUrl);
      setisLoading(false);
      Alert.info('Avatar Uploaded', 4000);
    } catch (err) {
      setisLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-hugesize"
      />
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
                  ref={avatorEditorRef}
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
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadbtn;
