import { Box, Heading, Text, Flex, Tag, Avatar, Divider } from '@chakra-ui/react';
import MarkdownRenderer from '../editor/MarkdownRenderer';
import AnswersList from '../answers/AnswersList';
import AnswerForm from '../answers/AnswerForm';
import TimeAgo from 'react-timeago';

export default function QuestionDetail({ question }) {
  return (
    <>    
    <Box>
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
            <Link to={`/tags/${tag}`}/>{tag}
          </Tag>
        ))}
      </Flex>
      <Divider my={4} />
      <MarkdownRenderer content={question.description} />
      <Divider my={6} />
      <AnswersList questionId={question._id} acceptedAnswer={question.acceptedAnswer} />
      <AnswerForm questionId={question._id} />
    </Box>
    </>
  );
}