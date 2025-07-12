import { Box, Flex, Avatar, Text, Heading, IconButton } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaCheck } from 'react-icons/fa';
import MarkdownRenderer from '../editor/MarkdownRenderer';
import TimeAgo from 'react-timeago';

export default function AnswerItem({ answer, isAccepted, questionOwner, onVote, onAccept }) {
  const handleVote = (voteType) => {
    onVote(answer._id, voteType);
  };

  const handleAccept = () => {
    onAccept(answer._id);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mb={4}
      borderColor={isAccepted ? 'green.200' : 'gray.200'}
      bg={isAccepted ? 'green.50' : 'white'}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Flex align="center">
          <Avatar size="sm" name={answer.answeredBy?.name} mr={2} />
          <Text fontSize="sm" color="gray.500">
            answered <TimeAgo date={answer.createdAt} />
          </Text>
        </Flex>
        {questionOwner && (
          <IconButton
            icon={<FaCheck />}
            aria-label="Accept answer"
            colorScheme={isAccepted ? 'green' : 'gray'}
            onClick={handleAccept}
            size="sm"
          />
        )}
      </Flex>
      <MarkdownRenderer content={answer.content} />
      <Flex mt={4} gap={2}>
        <IconButton
          icon={<FaThumbsUp />}
          aria-label="Upvote"
          colorScheme={answer.userVote === 'upvote' ? 'blue' : 'gray'}
          onClick={() => handleVote('upvote')}
          size="sm"
        />
        <Text mx={2}>{answer.upvotes.length - answer.downvotes.length}</Text>
        <IconButton
          icon={<FaThumbsDown />}
          aria-label="Downvote"
          colorScheme={answer.userVote === 'downvote' ? 'red' : 'gray'}
          onClick={() => handleVote('downvote')}
          size="sm"
        />
      </Flex>
    </Box>
  );
}