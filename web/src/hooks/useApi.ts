import axios from "axios";
import { useEffect, useState } from "react";

interface PropsInterface {
	url: string;
}

export default function useApi(useApiProps: PropsInterface) {
	const { url } = useApiProps;
	const [apiData, setApiData]: any = useState(null);

	useEffect(() => {
		const fetchData = async (apiUrl: string) => {
			const data = await axios.get(apiUrl);
			setApiData(data);
		}
		try {
			fetchData(url);
		} catch (e) {
			console.error(e);
		}
	}, [url]);

	return apiData;
}
