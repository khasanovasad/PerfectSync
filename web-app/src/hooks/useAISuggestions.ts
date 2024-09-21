import axios from 'axios';
import { useEffect, useState } from 'react';

interface AIParams {
  latitude: string;
  longitude: string;
  price: string;
  area: string;
  rooms: string;
  level: string;
}

export const useAISuggestions = () => {
  const [results, setResults] = useState<string | null>(null);

  useEffect(() => {
    console.log(results, results);
  }, [results]);

  const fetchAiDate = async ({
    latitude,
    longitude,
    area,
    level,
    price,
    rooms,
  }: AIParams) => {
    const data = await axios.get<string>(`http://localhost:5059/Main/Get1`, {
      data: {
        latitude,
        longitude,
        area,
        level,
        price,
        rooms,
      },
    });
    console.log(data);
    if (data) {
      setResults(data.data);
    }
  };
  return { results, fetchAiDate };
};
