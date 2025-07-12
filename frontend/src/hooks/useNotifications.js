import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useEffect } from 'react';
import  useAuth  from './useAuth';

export default function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => api.getNotifications(),
    enabled: !!user, // Only fetch if user is logged in
    refetchInterval: 60000, // Poll every 60 seconds
  });

  // Mark notifications as read
  const markAsReadMutation = useMutation({
    mutationFn: () => api.markAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  // Count unread notifications
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  // Automatically mark as read when notifications are opened
  useEffect(() => {
    if (unreadCount > 0 && notifications) {
      markAsReadMutation.mutate();
    }
  }, [notifications]);

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead: markAsReadMutation.mutate
  };
}