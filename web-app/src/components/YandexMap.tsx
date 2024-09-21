import React, { useEffect, useState } from 'react';
import useYandexMap from '../hooks/useYandexMap';
import { MarkerData } from '../types';
import Card from './Card';
import Header from './Header';
import SearchWithSuggestions from './SearchWithSuggestions';

const YandexMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [markersData, setMarkersData] = useState<MarkerData[]>([
    {
      coordinates: [41.3111, 69.2404],
      hintContent: 'Marker 1',
      balloonContent: 'First marker',
    },
    {
      coordinates: [41.295, 69.26],
      hintContent: 'Marker 2',
      balloonContent: 'Second marker',
    },
  ]);

  const apiKey = import.meta.env.VITE_YANDEX_API_KEY || '';
  const suggestKey = import.meta.env.VITE_YANDEX_SUGGEST_KEY || '';

  const {
    mapContainer,
    handleSearch,
    fetchSuggestions,
    suggestions,
    selectSuggestion,
  } = useYandexMap(markersData, apiKey, suggestKey);

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <Header />
      <main className="flex gap-10 px-8">
        <div className="flex flex-col w-1/2 justify-items-start">
          <SearchWithSuggestions
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            suggestions={suggestions}
            handleSearch={() => handleSearch(searchQuery)}
            setSuggestions={selectSuggestion}
            className="w-1/2"
          />
          <Card title="school" distance="500m" percentage="30%" />
        </div>

        <div ref={mapContainer} style={{ width: '50%', height: '500px' }} />
      </main>
    </>
  );
};

export default YandexMap;
