import { useState } from 'react';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import MarkdownEditor from '../editor/MarkdownEditor';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';

export default function AnswerForm({ questionId }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await api.createAnswer(questionId, { content });
      setContent('');
      toast({
        title: 'Answer posted',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Failed to post answer',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={8}>
      <MarkdownEditor
        value={content}
        onChange={setContent}
        height={300}
      />
      <Flex justify="flex-end" mt={4}>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          loadingText="Posting..."
          isDisabled={!content.trim()}
        >
          Post Answer
        </Button>
      </Flex>
    </Box>
  );
}