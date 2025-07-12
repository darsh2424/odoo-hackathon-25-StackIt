import { Box, Heading, Text, Flex, Tag, Avatar, IconButton } from '@chakra-ui/react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

export default function QuestionCard({ question }) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex align="center" mb={2}>
        <Avatar size="sm" name={question.askedBy?.name} mr={2} />
        <Text fontSize="sm" color="gray.500">
          asked <TimeAgo date={question.createdAt} />
        </Text>
      </Flex>
      <Heading size="md" mb={2}>
        <Link to={`/questions/${question._id}`}>{question.title}</Link>
      </Heading>
      <Text noOfLines={3} mb={3}>
        {question.description.replace(/<[^>]*>/g, '').substring(0, 200)}
      </Text>
      <Flex wrap="wrap" gap={2} mb={3}>
        {question.tags?.map((tag) => (
          <Tag key={tag} colorScheme="blue" size="sm">
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </Tag>
        ))}
      </Flex>
      <Flex justify="space-between">
        <Flex align="center" gap={3}>
          <Flex align="center">
            <IconButton icon={<FaThumbsUp />} size="sm" variant="ghost" aria-label="Upvote" />
            <Text mx={1}>{question.votes}</Text>
          </Flex>
          <Flex align="center">
            <FaComment />
            <Text ml={1}>{question.answersCount || 0}</Text>
          </Flex>
        </Flex>
        <Text fontSize="sm" color="gray.500">
          {question.views} views
        </Text>
      </Flex>
    </Box>
  );
}