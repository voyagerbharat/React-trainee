import firebase from 'firebase/app';
import React, { useState, useCallback, useRef } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import { auth, database } from '../misc/firebase';
import { useModalState } from '../misc/Custom-Hooks';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('chat name is required'),
  description: StringType().isRequired('Description is required'),
});

const initialFormState = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  // eslint-disable-next-line no-unused-vars
  const { isOpen, open, close } = useModalState();
  const [FormValue, setFormValue] = useState(initialFormState);
  const [isLoading, setisLoading] = useState(false);
  const formRef = useRef();
  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    setisLoading(true);

    const newRoomData = {
      ...FormValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref('rooms').push(newRoomData);
      Alert.info(`${FormValue.name} has been created`, 4000);
      setisLoading(false);
      setFormValue(initialFormState);
      close();
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="mt-1">
      <Button block color="red" onClick={open}>
        <Icon icon="creative" />
        Create a new chat room
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={FormValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Enter room name</ControlLabel>
              <FormControl name="name" placeholder="Enter the chat Room ..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter the chat description ..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create a new Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
