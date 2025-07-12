import { Badge, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import NotificationList from './NotificationList';
import useNotifications from '../../hooks/useNotifications';

export default function NotificationBell() {
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter(n => !n.read).length;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Notifications"
        icon={
          <>
            <BellIcon />
            {unreadCount > 0 && (
              <Badge colorScheme="red" borderRadius="full" fontSize="xs" ml="-2" mt="-2">
                {unreadCount}
              </Badge>
            )}
          </>
        }
        variant="ghost"
      />
      <MenuList maxH="400px" overflowY="auto" p={0}>
        <NotificationList notifications={notifications} />
      </MenuList>
    </Menu>
  );
}