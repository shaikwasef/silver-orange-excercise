import { IApiError, ApiResponse } from './../../interfaces/use-api.interface';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function useApi<ResponseType>(
  url: string
): ApiResponse<ResponseType> {
  const [apiData, setApiData] = useState<ResponseType[]>([]);
  const [error, setError] = useState<IApiError>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        validateStatus(status) {
          return status < 700; // Resolve only if the status code is less than 500
        },
      })
      .then((resp) => {
        setLoading(false);
        setApiData(resp.data);
      })
      .catch((e) => {
        const err = e as AxiosError<IApiError, any>;
        setLoading(false);
        if (err.response?.data) {
          setError(err.response?.data);
        } else {
          //Need to handle 400 error manually since axios ignores response for status code 400
          setError({ status: 400, message: err.message });
        }
      });
  }, [url]);

  return [apiData, error, loading];
}
