import {
  
  Button,
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
import React from 'react';


import { RiMenu5Fill, RiArrowDownCircleFill } from 'react-icons/ri';

export default function DrawerExample(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        zIndex={['auto', 'overlay']}
        rounded={['md', '2xl']}
        colorScheme={'blue'}
        variant="ghost"
        position={['relative', 'fixed']}
        top={['1', '6']}
        left={'4'}
        onClick={onOpen}
      >
        <RiMenu5Fill
          fontSize={['md', '3xl']}
          width={['0', '24']}
          height={['0', '24']}
        />
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
                {props.models?.map(elem => (
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
