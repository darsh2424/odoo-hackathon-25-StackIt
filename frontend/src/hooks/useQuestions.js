import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export default function useQuestions(sort = 'newest') {
  return useQuery({
    queryKey: ['questions', sort],
    queryFn: () => api.getQuestions({ sort }),
  });
}