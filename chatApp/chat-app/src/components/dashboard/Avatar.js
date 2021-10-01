import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../../misc/helper';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar size="lg" {...avatarProps} circle alt={getNameInitials(name)} />
  );
};

export default ProfileAvatar;
