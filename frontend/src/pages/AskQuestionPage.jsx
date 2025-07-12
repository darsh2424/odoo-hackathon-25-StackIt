import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import TagsInput from '../components/tags/TagsInput';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export default function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/auth?redirect=/ask-question');
    
    setIsSubmitting(true);
    try {
      await api.createQuestion({ title, description, tags });
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={6}>Ask a Question</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question?"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <MarkdownEditor
              value={description}
              onChange={setDescription}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Tags</FormLabel>
            <TagsInput selectedTags={tags} onChange={setTags} />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Posting..."
          >
            Post Question
          </Button>
        </Stack>
      </form>
    </Box>
  );
}