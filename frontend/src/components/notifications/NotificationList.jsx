import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { FaComment, FaThumbsUp, FaUserTag } from 'react-icons/fa';
import TimeAgo from 'react-timeago';

const iconMap = {
  answer: FaComment,
  vote: FaThumbsUp,
  mention: FaUserTag,
};

export default function NotificationList({ notifications }) {
  return (
    <Stack spacing={0}>
      {notifications?.map((notification) => (
        <Box
          key={notification._id}
          p={3}
          borderBottomWidth="1px"
          bg={notification.read ? 'white' : 'blue.50'}
        >
          <Link href={notification.link} display="block">
            <Flex align="center">
              <Icon
                as={iconMap[notification.type] || FaComment}
                color="blue.500"
                mr={2}
              />
              <Text flex={1} fontSize="sm">
                {notification.message}
              </Text>
              <Text fontSize="xs" color="gray.500">
                <TimeAgo date={notification.createdAt} />
              </Text>
            </Flex>
          </Link>
        </Box>
      ))}
      {notifications?.length === 0 && (
        <Box p={3} textAlign="center">
          <Text color="gray.500">No notifications yet</Text>
        </Box>
      )}
    </Stack>
  );
}