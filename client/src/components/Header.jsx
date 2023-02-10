import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

// import { useDispatch } from 'react-redux';

const Header = ({ isAuthenticated, user }) => {
//   const dispatch = useDispatch();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const ButtonLink = ({ path = '/', name = 'Home', onClose }) => (
    <Link onClick={onClose} to={path}>
      <Button variant={'ghost'}>{name}</Button>
    </Link>
  );
  const logoutHandler = e => {
    e.preventDefault();
    
    console.log('Logged Out');
    onClose();
  };
  // const isAuthenticated = false;
  // const user = {
  //   role:"admin",

  // }

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'blue'}
        top={'6'}
        left={'6'}
        width={'12'}
        height={'12'}
        position={'fixed'}
        rounded={'2xl'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(2px)'}>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>BOOK WORMS</DrawerHeader>
            <DrawerBody>
              <VStack spacing={'4'} alignItems={'flex-start'}>
                <ButtonLink onClose={onClose} />
                <ButtonLink onClose={onClose} path="/books" name="All Books" />
                <ButtonLink
                  onClose={onClose}
                  path="/books/classics"
                  name={'Classics'}
                />
                {isAuthenticated && (
                  <ButtonLink
                    onClose={onClose}
                    path="/uploadbook"
                    name="Upload A Book"
                  />
                )}
                <ButtonLink onClose={onClose} path="/about" name="About" />
                <HStack
                  justifyContent={'space-evenly'}
                  width={'80%'}
                  bottom={'2rem'}
                  position={'absolute'}
                >
                  {isAuthenticated ? (
                    <>
                      <VStack>
                        <HStack>
                          <Link onClick={onClose} to="/profile">
                            <Button variant={'ghost'} colorScheme={'blue'}>
                              Profile
                            </Button>
                          </Link>

                          <Button
                            onClick={logoutHandler}
                            variant={'ghost'}
                            colorScheme={'red'}
                          >
                            <RiLogoutBoxLine /> &nbsp; Logout
                          </Button>
                        </HStack>
                        {user && user.role === 'admin' && (
                          <Link onClick={onClose} to="/admin/dashboard">
                            <Button variant={'ghost'} colorScheme={'purple'}>
                              <RiDashboardFill /> &nbsp; DashBoard
                            </Button>
                          </Link>
                        )}
                      </VStack>
                    </>
                  ) : (
                    <>
                      <Link onClick={onClose} to="/login">
                        <Button colorScheme={'blue'}>Login</Button>
                      </Link>
                      <p>OR</p>

                      <Link onClick={onClose} to="/register">
                        <Button colorScheme={'blue'}>Sign Up</Button>
                      </Link>
                    </>
                  )}
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Header;
