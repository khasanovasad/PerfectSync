import React, { useEffect, useState } from 'react';
import useYandexMap from '../hooks/useYandexMap';
import { MarkerData } from '../types';
import Card from './Card';
import ExtraFormInputs from './ExtraInputForms';
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
  const [price, setPrice] = useState<string | null>(null);

  const {
    mapContainer,
    handleSearch,
    fetchSuggestions,
    suggestions,
    selectSuggestion,
    coordinates,
  } = useYandexMap(markersData);

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
          <ExtraFormInputs
            updatePrice={(price: string) => setPrice(price)}
            coordinates={coordinates}
          />
          <Card price={price} />
        </div>

        <div ref={mapContainer} style={{ width: '50%', height: '500px' }} />
      </main>
    </>
  );
};

export default YandexMap;
