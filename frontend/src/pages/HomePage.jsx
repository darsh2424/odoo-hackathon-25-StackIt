import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import QuestionCard from '../components/questions/QuestionCard';
import api from '../services/api';

export default function HomePage() {
  const [sort, setSort] = useState('newest');
  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', sort],
    queryFn: () => api.getQuestions({ sort }),
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">All Questions</Heading>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          width="200px"
        >
          <option value="newest">Newest</option>
          <option value="votes">Most Votes</option>
          <option value="views">Most Views</option>
        </Select>
      </Flex>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        questions?.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))
      )}
    </Box>
  );
}