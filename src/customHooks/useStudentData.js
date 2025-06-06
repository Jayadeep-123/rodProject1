import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/payments';

const fetchFromEndpoint = async (endpoint, studentId) => {
  try {
    const specialPaths = {
      details: `${BASE_URL}/${studentId}/details`,
      concessions: `${BASE_URL}/students/${studentId}/concessions`,
      books: `${BASE_URL}/students/${studentId}/books`,
      basic: `${BASE_URL}/${studentId}/basic`,
    };

    const url = specialPaths[endpoint] || (endpoint ? `${BASE_URL}/${studentId}/${endpoint}` : `${BASE_URL}/${studentId}`);
    console.log(`Fetching from: ${url}`);
    const response = await axios.get(url);
    console.log(`Response for ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching ${endpoint} for student ${studentId}:`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      if (error.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
};

const useStudentData = (studentId) => {
  const endpoints = [
    { key: 'allDetails', endpoint: 'details', queryKey: ['studentAllDetails', studentId] },
    { key: 'basic', endpoint: 'basic', queryKey: ['studentBasic', studentId] },
    { key: 'payment', endpoint: 'payment', queryKey: ['studentPayment', studentId] },
    { key: 'feeDetails', endpoint: 'fee-details', queryKey: ['studentFeeDetails', studentId] },
    { key: 'cards', endpoint: 'cards', queryKey: ['studentCards', studentId] },
    { key: 'feeInstallments', endpoint: 'fee-installments', queryKey: ['studentFeeInstallments', studentId] },
    { key: 'paymentHistory', endpoint: 'payment-history', queryKey: ['studentPaymentHistory', studentId] },
    { key: 'concessions', endpoint: 'concessions', queryKey: ['studentConcessions', studentId] },
    { key: 'pocketMoney', endpoint: 'pocket-money', queryKey: ['studentPocketMoney', studentId] },
    { key: 'transport', endpoint: 'transport', queryKey: ['studentTransport', studentId] },
    { key: 'books', endpoint: 'books', queryKey: ['studentBooks', studentId] },
    { key: 'refunds', endpoint: 'refund', queryKey: ['studentRefunds', studentId] },
    { key: 'otherFeeHeads', endpoint: 'other_fee-heads', queryKey: ['studentOtherFeeHeads', studentId] },
  ];

  const queries = useQueries({
    queries: endpoints.map(({ key, endpoint, queryKey }) => {
      console.log(`Initializing query for ${key}:`, { queryKey, enabled: !!studentId });
      return {
        queryKey,
        queryFn: () => fetchFromEndpoint(endpoint, studentId),
        enabled: !!studentId,
        retry: (failureCount, error) => {
          if (axios.isAxiosError(error) && error.response?.status === 404) return false;
          return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        select: (data) => {
          if (data === null || data === undefined) return null;
          if (typeof data === 'object' && Object.keys(data).length === 0) return null;
          return data;
        },
      };
    }),
  });

  if (!studentId) {
    console.error('No studentId provided');
    return {
      studentData: {},
      isLoading: false,
      isError: true,
      isSuccess: false,
    };
  }

  // Debug query initialization
  console.log('Queries initialized:', queries.length, 'expected:', endpoints.length);
  if (queries.length !== endpoints.length) {
    console.error('Query length mismatch:', { queriesLength: queries.length, endpointsLength: endpoints.length });
  }

  const studentData = endpoints.reduce((acc, { key }, index) => {
    // Safeguard against undefined queries
    const query = queries[index] || {
      data: null,
      isLoading: false,
      isError: true,
      error: new Error(`Query ${key} not initialized`),
      isSuccess: false,
      status: 'error',
    };

    const hasData = query.data !== null && query.data !== undefined;
    const isEmpty = Array.isArray(query.data)
      ? query.data.length === 0
      : typeof query.data === 'object' && query.data !== null && Object.keys(query.data).length === 0;

    acc[key] = {
      data: query.data,
      isLoading: query.isLoading,
      error: query.error,
      isSuccess: query.isSuccess && hasData,
      isError: query.isError,
      isEmpty,
      status: query.status,
    };
    return acc;
  }, {});

  const isLoading = queries.some((query) => query?.isLoading);
  const isError = queries.some((query) => query?.isError);
  const isSuccess = queries.every((query) => query?.isSuccess || !query?.isEnabled);

  console.log('Student Data Debug:', {
    studentId,
    isLoading,
    isError,
    isSuccess,
    individualQueries: endpoints.map((_, i) => ({
      key: endpoints[i].key,
      endpoint: endpoints[i].endpoint,
      url: endpoints[i].endpoint === 'pocket-money' ? `${BASE_URL}/${studentId}/pocket-money` : 'other',
      isLoading: queries[i]?.isLoading ?? false,
      isSuccess: queries[i]?.isSuccess ?? false,
      isError: queries[i]?.isError ?? true,
      status: queries[i]?.status ?? 'not_initialized',
      hasData: queries[i]?.data !== null && queries[i]?.data !== undefined,
      data: queries[i]?.data,
      error: queries[i]?.error?.message,
    })),
  });

  return { studentData, isLoading, isError, isSuccess };
};

export default useStudentData;