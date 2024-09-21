import React, { useEffect, useState } from 'react';
import useYandexMap from '../hooks/useYandexMap';
import { MarkerData } from '../types';
import MapControls from './MapControls';

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
    <div>
      <h1>Yandex Map with Custom Search (Restricted to Uzbekistan)</h1>
      <MapControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => handleSearch(searchQuery)}
        suggestions={suggestions}
        selectSuggestion={selectSuggestion}
      />
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default YandexMap;
