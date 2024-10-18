import { useState } from "react";
import useMounted from "./use-mounted";

type FetcherResponse<TData> = Promise<TData>;

type TFetcher1<TData> = () => FetcherResponse<TData>;
type TFetcher2<TData, TParam> = (param: TParam) => FetcherResponse<TData>;

type Props<TData, TParam> = {
  fetcher: TFetcher1<TData> | TFetcher2<TData, TParam>;
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    onFinally?: () => void;
  };
};

function useMutation<TData = unknown, TParam = unknown>(
  props: Props<TData, TParam>,
) {
  const [data, setData] = useState<TData | null>(null);
  const [state, setState] = useState<{
    data: TData | null;
    error: Error | null;
    isMutating: boolean;
  }>({
    data: null,
    error: null,
    isMutating: false,
  });

  const isMounted = useMounted();

  const mutate = async (param?: TParam) => {
    setState({ ...state, isMutating: true });

    try {
      const data = await props.fetcher((param ?? null) as any);

      if (isMounted()) {
        setData(data);
        props.options?.onSuccess?.(data);
      }
    } catch (error) {
      props.options?.onError?.(error as Error);
      setState({ ...state, error: error as Error });
    } finally {
      props.options?.onFinally?.();
      setState({ ...state, isMutating: false });
    }
  };

  return {
    mutate,
    ...state,
    data,
  };
}

export default useMutation;
