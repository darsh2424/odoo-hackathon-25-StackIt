import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react';
import { useSearchParams, Navigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import useAuth from '../hooks/useAuth';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const redirect = searchParams.get('redirect') || '/';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <Heading mb={6} textAlign="center">
        {redirect === '/ask-question' ? 'Login to Ask a Question' : 'Welcome'}
      </Heading>
      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList mb="4">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Login</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <AuthForm mode="login" redirect={redirect} />
          </TabPanel>
          <TabPanel px={0}>
            <AuthForm mode="register" redirect={redirect} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}