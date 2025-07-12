import { useState } from 'react';
import { Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { signInWithGoogle } from '../../firebase';
import api from '../../services/api';

export default function AuthForm({ mode = 'login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await api.login({ email, password });
      } else {
        await api.register({ email, password, name });
      }
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Google Login Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit}>
      {mode === 'register' && (
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <Button type="submit" colorScheme="blue" isLoading={isLoading}>
        {mode === 'login' ? 'Login' : 'Register'}
      </Button>
      <Button onClick={handleGoogleLogin} leftIcon={<GoogleIcon />}>
        Continue with Google
      </Button>
    </Stack>
  );
}