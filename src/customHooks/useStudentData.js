// useStudentData.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/payments';

const fetchStudentData = async (studentId, endpoint) => {
  try {
    const url = `${BASE_URL}/${studentId}/${endpoint}`;
    console.log(`Fetching from: ${url}`);
    const response = await axios.get(url);
    console.log(`Response for ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching ${endpoint} for student ${studentId}:`, error.response?.status, error.message);
      if (error.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
};

const useStudentData = (studentId, endpoint) => {
  const query = useQuery({
    queryKey: [endpoint, studentId],
    queryFn: () => fetchStudentData(studentId, endpoint),
    enabled: !!studentId,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => data ?? null,
  });

  const studentData = {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isSuccess: query.isSuccess && query.data !== undefined && query.data !== null,
    isError: query.isError || (!query.isLoading && query.data === undefined),
    isEmpty: Array.isArray(query.data) && query.data.length === 0,
    status: query.status,
  };

  console.log(`Student ${endpoint} Debug:`, {
    studentId,
    endpoint,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    status: query.status,
    hasData: query.data !== undefined && query.data !== null,
    dataType: Array.isArray(query.data) ? 'array' : typeof query.data,
    dataLength: Array.isArray(query.data) ? query.data.length : 'N/A',
  });

  return { studentData, isLoading: query.isLoading, isError: query.isError, isSuccess: query.isSuccess };
};

export default useStudentData;