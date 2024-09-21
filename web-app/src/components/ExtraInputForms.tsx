import React, { useEffect, useState } from 'react';
import { useAISuggestions } from '../hooks/useAISuggestions';
import { useFormReducer } from '../hooks/useFormReducer'; // Assuming the hook is in this path
import useYandexMap from '../hooks/useYandexMap';
import { MarkerData } from '../types';

const ExtraFormInputs: React.FC = () => {
  const { state, setPrice, setCapacity, setRooms, setLevel } = useFormReducer();

  const apiKey = import.meta.env.VITE_YANDEX_API_KEY || '';
  const suggestKey = import.meta.env.VITE_YANDEX_SUGGEST_KEY || '';

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
  const { results, fetchAiDate } = useAISuggestions();
  const { coordinates } = useYandexMap(markersData, apiKey, suggestKey);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const submitAIDate = () => {
    if (
      coordinates !== null &&
      state.area &&
      state.level &&
      state.price &&
      state.rooms
    ) {
      fetchAiDate({
        longitude: coordinates[0].toString(),
        latitude: coordinates[1].toString(),
        level: state.level,
        price: state.price,
        rooms: state.rooms,
        area: state.area,
      });
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          value={state.price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label
          htmlFor="capacity"
          className="block text-sm font-medium text-gray-700"
        >
          Area
        </label>
        <input
          type="text"
          id="capacity"
          value={state.area}
          onChange={(e) => setCapacity(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label
          htmlFor="rooms"
          className="block text-sm font-medium text-gray-700"
        >
          Rooms
        </label>
        <input
          type="text"
          id="rooms"
          value={state.rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label
          htmlFor="level"
          className="block text-sm font-medium text-gray-700"
        >
          Level
        </label>
        <input
          type="text"
          id="level"
          value={state.level}
          onChange={(e) => setLevel(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default ExtraFormInputs;
