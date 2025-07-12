import { Box, Flex, Heading, Text, Tag, Avatar, Divider, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MarkdownRenderer from '../components/editor/MarkdownRenderer';
import AnswersList from '../components/answers/AnswersList';
import AnswerForm from '../components/answers/AnswerForm';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import TimeAgo from 'react-timeago';

export default function QuestionPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: question, isLoading, error } = useQuery({
    queryKey: ['question', id],
    queryFn: () => api.getQuestion(id),
  });

  if (isLoading) {
    return (
      <Flex justify="center" mt={8}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={8}>
        <Text color="red.500">Error loading question: {error.message}</Text>
      </Box>
    );
  }

  if (!question) {
    return (
      <Box textAlign="center" mt={8}>
        <Text>Question not found</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={4}>{question.title}</Heading>
      
      <Flex align="center" mb={4}>
        <Avatar size="sm" name={question.askedBy?.name} mr={2} />
        <Text fontSize="sm" color="gray.500">
          asked <TimeAgo date={question.createdAt} />
        </Text>
      </Flex>

      <Flex wrap="wrap" gap={2} mb={4}>
        {question.tags?.map((tag) => (
          <Tag key={tag} colorScheme="blue" size="sm">
            {tag}
          </Tag>
        ))}
      </Flex>

      <Divider my={4} />

      <MarkdownRenderer content={question.description} />

      <Divider my={6} />

      <Heading size="md" mb={4}>
        {question.answersCount || 0} Answers
      </Heading>

      <AnswersList 
        questionId={question._id} 
        acceptedAnswer={question.acceptedAnswer} 
        questionOwnerId={question.askedBy?._id}
        currentUserId={user?.uid}
      />

      {user && (
        <>
          <Heading size="md" mt={8} mb={4}>
            Your Answer
          </Heading>
          <AnswerForm questionId={question._id} />
        </>
      )}
    </Box>
  );
}