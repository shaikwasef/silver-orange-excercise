import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApiMarkDown(url: string): string {
  const [apiData, setApiData] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: string } = await axios.get(url);
      setApiData(data);
    };
    try {
      fetchData();
    } catch (e) {
      setApiData(e);
    }
  }, [url]);
  return apiData;
}
