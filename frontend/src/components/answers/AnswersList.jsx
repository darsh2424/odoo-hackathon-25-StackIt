import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import AnswerItem from './AnswerItem';
import api from '../../services/api';

export default function AnswersList({ questionId, acceptedAnswer, questionOwnerId, currentUserId }) {
  const { data: answers, isLoading } = useQuery({
    queryKey: ['answers', questionId],
    queryFn: () => api.getAnswers(questionId),
  });

  if (isLoading) {
    return <Box>Loading answers...</Box>;
  }

  return (
    <Box>
      {answers?.map((answer) => (
        <AnswerItem
          key={answer._id}
          answer={answer}
          isAccepted={answer._id === acceptedAnswer}
          questionOwner={questionOwnerId === currentUserId}
          onVote={api.voteAnswer}
          onAccept={(answerId) => api.acceptAnswer(questionId, answerId)}
        />
      ))}
    </Box>
  );
}