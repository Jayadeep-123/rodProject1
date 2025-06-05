import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/payments';

const fetchStudentMetrics = async (studentId) => {
  try {
    const url = `${BASE_URL}/${studentId}/cards`;
    console.log(`Fetching from: ${url}`);
    const response = await axios.get(url);
    console.log('Response for student metrics:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching metrics for student ${studentId}:`, error.response?.status, error.message);
      if (error.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
};

const useStudentMetrics = (studentId) => {
  const query = useQuery({
    queryKey: ['studentMetrics', studentId],
    queryFn: () => fetchStudentMetrics(studentId),
    enabled: !!studentId,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data ?? null,
  });

  const studentMetrics = {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess && query.data !== undefined && query.data !== null,
    isError: query.isError || (!query.isLoading && query.data === undefined && query.data !== null),
    isEmpty: Array.isArray(query.data) && query.data.length === 0,
    status: query.status,
  };

  console.log('Student Metrics Debug:', {
    studentId,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    status: query.status,
    hasData: query.data !== undefined && query.data !== null,
    dataType: Array.isArray(query.data) ? 'array' : typeof query.data,
    dataLength: Array.isArray(query.data) ? query.data.length : 'N/A',
  });

  return { studentMetrics, isLoading: query.isLoading, isError: query.isError, isSuccess: query.isSuccess };
};

export default useStudentMetrics;