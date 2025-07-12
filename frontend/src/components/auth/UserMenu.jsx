import { Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserMenu({ user }) {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="User menu"
        icon={<Avatar size="sm" name={user.name} src={user.photoURL} />}
        variant="ghost"
        rounded="full"
      />
      <MenuList>
        <MenuItem icon={<FiUser />} onClick={() => navigate('/profile')}>
          Profile
        </MenuItem>
        <MenuItem icon={<FiSettings />} onClick={() => navigate('/settings')}>
          Settings
        </MenuItem>
        <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}