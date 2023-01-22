import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IApiError } from '../../interfaces/use-api.interface';

export default function useApiMarkDown(
  url: string
): [string, IApiError | undefined] {
  const [apiData, setApiData] = useState<string>('');
  const [error, setError] = useState<IApiError>();
  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: string } = await axios.get(url);
      setApiData(data);
    };
    try {
      fetchData();
    } catch (e) {
      const err = e as AxiosError<IApiError, any>;
      if (err.response?.data) {
        setError(err.response?.data);
      } else {
        //Need to handle 400 error manually since axios ignores response for status code 400
        setError({ status: 400, message: err.message });
      }
    }
  }, [url]);
  return [apiData, error];
}
