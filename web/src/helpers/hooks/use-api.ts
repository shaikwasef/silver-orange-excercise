import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApi<ResponseType>(url: string): ResponseType[] {
  const [apiData, setApiData] = useState<ResponseType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: ResponseType[] } = await axios.get(url);
      setApiData(data);
    };
    try {
      fetchData();
    } catch (e) {
      console.error(e);
    }
  }, [url]);
  return apiData;
}
