import { Box, Heading, Text, Flex, Tag as ChakraTag } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import QuestionCard from '../components/questions/QuestionCard';
import api from '../services/api';

export default function TagPage() {
  const { name } = useParams();
  const { data: tag, isLoading: isTagLoading } = useQuery({
    queryKey: ['tag', name],
    queryFn: () => api.getTag(name),
  });

  const { data: questions, isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['questions', 'tag', name],
    queryFn: () => api.getQuestions({ tag: name }),
  });

  if (isTagLoading) {
    return <Box>Loading tag information...</Box>;
  }

  if (!tag) {
    return <Box>Tag not found</Box>;
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Flex align="center" mb={6}>
        <ChakraTag colorScheme="blue" size="lg" mr={3}>
          {tag.name}
        </ChakraTag>
        <Text fontSize="lg" color="gray.600">
          {tag.questionsCount} questions
        </Text>
      </Flex>

      {tag.description && (
        <Box mb={8}>
          <Text>{tag.description}</Text>
        </Box>
      )}

      <Heading size="md" mb={4}>
        Questions tagged with {tag.name}
      </Heading>

      {isQuestionsLoading ? (
        <Box>Loading questions...</Box>
      ) : (
        questions?.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      )}
    </Box>
  );
}