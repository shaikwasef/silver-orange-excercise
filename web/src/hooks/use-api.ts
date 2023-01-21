import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApi<ResponseType>(url: string): ResponseType[] {
  const [apiData, setApiData]: any = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(url);
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
