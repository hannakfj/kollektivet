import {Circle} from '@chakra-ui/react';
import React from 'react';

const User = ({ name, imageUrl }) => {
  return (

      <Circle
      backgroundImage={imageUrl}
      backgroundSize="cover" 
      backgroundPosition="center" 
      size="160px" 
      color="white" 
      boxShadow="lg" 
      p={6} 
      textAlign="center">
      </Circle>

  );
};

export default User;
