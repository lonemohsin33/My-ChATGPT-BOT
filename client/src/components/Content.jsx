import {
  HStack,

  VStack,
  Text,
  
} from '@chakra-ui/react';
import React from 'react';



import { ReactComponent as User } from '../utils/user-svgrepo-com.svg';
import { ReactComponent as Bots } from '../utils/bot.svg';
export default function Content({ chats }) {
  return (
    <VStack
      position={'relative'}
      top="2"
      left={'0'}
      right={'0'}
      minH={'10vh'}
      maxH={'auto'}
      spacing={'0'}
    >
      <HStack
        borderRadius={'20px'}
        minH={'10vh'}
        maxW={'90%'}
        minW={'90%'}
        position={'relative'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        padding={'2'}
        bgColor={chats.user === 'bot' ? 'blackAlpha.100' : ''}
        spacing={['2', '6']}
      >
        {chats.user === 'user' ? <User /> : <Bots />}

        <Text
          p={'2'}
          maxW={'70%'}
          fontFamily={'cursive'}
          fontWeight={'bold'}
          fontSize={'lg'}
        >
          {chats.message}
        </Text>
      </HStack>
    </VStack>
  );
}
