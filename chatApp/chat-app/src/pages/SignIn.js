import React from 'react';
import { Container, Grid, Row, Col, Panel, Icon, Button, Alert } from 'rsuite';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvieder = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed In', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };
  const onGoogeSignIn = () => {
    signInWithProvieder(new firebase.auth.GoogleAuthProvider());
  };
  const onFacebookSignIn = () => {
    signInWithProvieder(new firebase.auth.FacebookAuthProvider());
  };
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to chat</h2>
                <p>Progressive chat Platform!!</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>
                <Button block color="green" onClick={onGoogeSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
