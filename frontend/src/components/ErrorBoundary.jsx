import { Box, Text, Button } from '@chakra-ui/react';
import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { error: null };
  
  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Box p={4} bg="red.50" borderWidth={1} borderColor="red.200">
          <Text fontSize="xl" color="red.600">Something went wrong</Text>
          <Text mb={4}>{this.state.error.message}</Text>
          <Button colorScheme="red" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Box>
      );
    }
    return this.props.children; 
  }
}