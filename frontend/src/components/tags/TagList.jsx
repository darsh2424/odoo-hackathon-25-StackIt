import { SimpleGrid, Tag, Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function TagList({ tags }) {
  return (
    <Box>
      <Heading size="lg" mb={6}>
        Tags
      </Heading>
      <SimpleGrid columns={[2, 3, 4]} spacing={4}>
        {tags.map((tag) => (
          <Box key={tag.name} p={4} borderWidth="1px" borderRadius="md">
            <Tag colorScheme="blue" mb={2}>
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
            <Text fontSize="sm" noOfLines={2}>
              {tag.description || 'No description'}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              {tag.questionsCount} questions
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}