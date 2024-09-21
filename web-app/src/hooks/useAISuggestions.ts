import axios from 'axios';
import { useEffect, useState } from 'react';

interface AIParams {
  latitude: string;
  longitude: string;
}

export const useAISuggestions = () => {
  const [results, setResults] = useState<string | null>(null);

  useEffect(() => {
    console.log(results, results);
  }, [results]);

  const fetchAiDate = async ({ latitude, longitude }: AIParams) => {
    const data = await axios.get<string>(
      `http://localhost:5059/Main/GetAQI?latitude${latitude}&longitude=${longitude}`
    );
    console.log(data);
    if (data) {
      setResults(data.data);
    }
  };
  return { results, fetchAiDate };
};
