import {
  MutationKey,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import useSnackbar from '@hooks/useSnackbar';

interface HandleReturnParams {
  status?: number;
  message?: string;
}

export interface HandleReturn {
  onSuccess?: (params?: HandleReturnParams) => void;
  onError?: (params?: HandleReturnParams) => void;
  showSuccessSnackbar?: boolean;
  successMessage?: string;
  showErrorSnackbar?: boolean;
  errorMessage?: string;
}

interface CustomMutation<Query, Response> {
  key: string;
  request: (params: Query) => Promise<Response>;
  handleReturn?: HandleReturn;
  queriesToInvalidate?: string[];
}

interface ApiErrorResponse {
  errors: { UNKNOWN: string };
}

function useCustomMutation<Query, Response>({
  handleReturn = { showErrorSnackbar: true, showSuccessSnackbar: true },
  key,
  request,
  queriesToInvalidate,
}: CustomMutation<Query, Response>) {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    retry: 2,
    retryDelay: 2000,
    mutationKey: key as unknown as MutationKey,
    mutationFn: (params: Query) => request(params),
    onSuccess: () => {
      if (handleReturn?.onSuccess) handleReturn?.onSuccess({});

      if (queriesToInvalidate) {
        queriesToInvalidate.map((queryKey) => {
          const typed = queryKey as unknown as QueryKey;
          queryClient.invalidateQueries({ queryKey: [typed] });
        });
      }

      if (handleReturn?.successMessage) {
        showSnackbar({
          type: 'success',
          message: handleReturn.successMessage,
        });
      }
    },
    onError: ({ response }: AxiosError) => {
      const apiResponse = response?.data as ApiErrorResponse;
      const apiResponseContent =
        apiResponse?.errors?.UNKNOWN || 'Ops, tente novamente!';

      if (handleReturn?.onError) {
        handleReturn?.onError({
          message: apiResponseContent,
          status: response?.status,
        });
      }

      if (handleReturn?.showErrorSnackbar) {
        showSnackbar({
          type: 'error',
          message: handleReturn?.errorMessage || apiResponseContent,
        });
      }
    },
  });
}

export default useCustomMutation;
