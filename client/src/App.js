
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { ReactComponent as User } from './utils/user-svgrepo-com.svg';
import { ReactComponent as Bots } from './utils/bot.svg';
import axios from 'axios'

import {
  Container,
  HStack,
  Input,
  VStack,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { ReactComponent as Send } from './utils/send-svgrepo-com (1).svg';
import {RiMenu5Fill, RiArrowDownCircleFill} from 'react-icons/ri'



function App() {
  const [ntext, setText] = useState('');
  const [chat, setChat]= useState([{'user':'bot', message:'What can i do for You, Today?'}])
  const [models, setModels]= useState([])
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [curModel, setCurModel] = useState('text-davinci-003');
  

 
  
  
  const handleSubmit = async e => {
    e.preventDefault();
    let chatLog = [...chat, { user: 'user', message: `${ntext}` }];
    await setChat(chatLog);
    await setText('');
    const messages = chatLog.map(message => message.message).join('\n');

    let response = await axios.post('http://localhost:4000/chat', {
      message: `${messages}`,
      model: `${curModel}`,
    }, {
      headers: {
        'Content-type': 'application/json',
      }
    });

    // const data = await response.json();
    // console.log(data.data)
    await setChat([
      ...chatLog,
      { user: 'bot', message: `${response.data.message}` },
    ]);
  };
   const handleclearClick = () => {
     setChat([]);
   };
  const fetchModels = () => {
    fetch('http://localhost:4000/models')
      .then(res => res.json())
      .then(data => setModels(data.models))
    
  }
  useEffect(() => {
    fetchModels()

  },[])
  
  return (
    <>
      <ColorModeSwitcher />
      <DrawerExample handleclearClick={handleclearClick} models={models} curModel={curModel} setCurModel={setCurModel} />
      {chat.map((elem, index) => (
        <Content log={elem} key={index} />
      ))}
      <form style={{ width: '70%' }} onSubmit={handleSubmit}>
        <HStack
          position="fixed"
          width={'60%'}
          bottom="6"
          bgColor={'blackAlpha.300'}
          right={'0'}
          marginRight={['50px', '200px']}
          maxH={['3vh', '6vh']}
          borderRadius={'lg'}
          padding={['2', '8']}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Input
            
            type={'text'}
            fontFamily={'cursive'}
            fontSize={'lg'}
            padding={['2', '7']}
            fontWeight={'bold'}
            outline="none"
            border="none"
            required
            value={ntext}
            placeholder={'Ask Question?'}
            onChange={e => setText(e.target.value)}
            variant="unstyled"
          />

          <Button type="submit" variant={'unstyled'}>
            <Send />
          </Button>
        </HStack>
      </form>
      ;
    </>
  );
}

export default App;

function Content({log}) {
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
        bgColor={log.user === 'bot' ? 'blackAlpha.100' : ''}
        spacing={['2', '6']}
      >
        {log.user === 'user' ? <User /> : <Bots />}

        <Text
          p={'2'}
          maxW={'70%'}
          fontFamily={'cursive'}
          fontWeight={'bold'}
          fontSize={'lg'}
        >
          {log.message}
        </Text>
      </HStack>
    </VStack>
  );
}
function DrawerExample(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();
  console.log(props.curModel)

  return (
    <>
      <Button
        zIndex={'overlay'}
        rounded={'2xl'}
        colorScheme={'blue'}
        variant="ghost"
        position={['relative', 'fixed']}
        top={['1', '6']}
        left={'4'}
        onClick={onOpen}
      >
        <RiMenu5Fill fontSize={'3xl'} width={'24'} height={'24'} />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor={'blackAlpha.600'} justifyContent={'center'}>
          <DrawerHeader
            borderBottom={'1px'}
            fontFamily={'cursive'}
            bgColor={'blackAlpha.100'}
            color={'whiteAlpha.800'}
          >
            CHATGPT-BOT{' '}
          </DrawerHeader>
          <DrawerBody
            my={'2'}
            justifyContent="center"
            alignItems={'center'}
            color={'blue.900'}
            fontFamily={'cursive'}
            fontSize={'xl'}
            fontWeight={'md'}
          >
            <Button
              onClick={props.handleclearClick}
              size={'lg'}
              bgColor={'whiteAlpha.700'}
              ml={'70px'}
              mb={'30px'}
            >
              Clear Chat
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                size="lg"
                width={'full'}
                rightIcon={<RiArrowDownCircleFill />}
                bgColor={'whiteAlpha.700'}
              >
                {props.curModel}
              </MenuButton>
              <MenuList
                onClick={e => props.setCurModel(e.target.value)}
                scrollBehavior={'smooth'}
                maxH={'70vh'}
                bgColor={'blackAlpha.500'}
                overflowY={'scroll'}
              >
                {props.models.map(elem => (
                  <MenuItem
                    bgColor={'blackAlpha.500'}
                    border={'1px solid '}
                    color={'whiteAlpha.800'}
                    fontFamily={'cursive'}
                    fontWeight={'medium'}
                    value={elem.id}
                    fontSize={'xl'}
                    key={elem.id}
                  >
                    {elem.id}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
