import { Box, Flex, Heading, Spacer, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import NotificationBell from '../notifications/NotificationBell';
import UserMenu from '../auth/UserMenu';
import useAuth from '../../hooks/useAuth';

export default function Layout({ children }) {
  const { user } = useAuth();

  return (
    <Box>
      <Flex as="header" p={4} bg="white" boxShadow="sm" align="center">
        <Heading size="md">
          <ChakraLink as={RouterLink} to="/">
            StackClone
          </ChakraLink>
        </Heading>
        <Spacer />
        <Flex align="center" gap={4}>
          <NotificationBell />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <ChakraLink as={RouterLink} to="/auth" color="blue.500">
              Login
            </ChakraLink>
          )}
        </Flex>
      </Flex>
      <Box as="main" p={4} maxW="1200px" mx="auto">
        {children}
      </Box>
    </Box>
  );
}