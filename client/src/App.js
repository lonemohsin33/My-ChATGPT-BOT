import { ColorModeSwitcher } from './ColorModeSwitcher';

import axios from 'axios';
import './app.css';

import { HStack, Input, Button, Stack } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';

import { ReactComponent as Send } from './utils/send-svgrepo-com (1).svg';

import DrawerExample from './components/DrawerExample';
import Content from './components/Content';

// let APIURL = 'https://chatgpt-2ttj.onrender.com';

function App() {
  const [ntext, setText] = useState('');
  const [chat, setChat] = useState([
    { user: 'bot', message: 'What can i do for You, Today?' },
  ]);
  const [models, setModels] = useState([]);

  const [curModel, setCurModel] = useState('text-davinci-003');
  const dummy = useRef(null);
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSubmit = async e => {
    e.preventDefault();

    let chatLog = [...chat, { user: 'user', message: `${ntext}` }];
    await setChat(chatLog);
    await setText('');
    const messages = chatLog.map(message => message.message).join('\n');

    let response = await axios.post(`https://chatgpt-2ttj.onrender.com/chat`, {
      message: `${messages}`,
      model: `${curModel}`,
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
    fetch(`https://chatgpt-2ttj.onrender.com/models`)
      .then(res => res.json())
      .then(data => setModels(data.models));
  };
  useEffect(() => {
    fetchModels();
  }, []);
  return (
    <Stack style={{ height: '90vh', overflowY: 'scroll' }} className={'scroll'}>
      <ColorModeSwitcher />
      <DrawerExample
        handleclearClick={handleclearClick}
        models={models}
        curModel={curModel}
        setCurModel={setCurModel}
      />
      <Stack>
        {chat.map((elem, index) => (
          <Content chats={elem} key={index} />
        ))}
        <div ref={dummy} />
      </Stack>
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
    </Stack>
  );
}

export default App;
