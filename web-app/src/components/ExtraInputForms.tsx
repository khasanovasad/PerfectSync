import React, { useEffect, useState } from 'react';
import { useAISuggestions } from '../hooks/useAISuggestions';
import { useFormReducer } from '../hooks/useFormReducer'; // Assuming the hook is in this path
import { MarkerData } from '../types';

const ExtraFormInputs: React.FC<{
  coordinates: [number, number] | null;
  updatePrice: (price: string) => void;
}> = ({ coordinates, updatePrice }) => {
  const { state, setPrice, setCapacity, setRooms, setLevel } = useFormReducer();

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

  useEffect(() => {
    if (results) {
      updatePrice(results);
    }
  });

  const submitAIDate = (e: any) => {
    if (
      coordinates !== null &&
      state.area &&
      state.level &&
      state.price &&
      state.rooms
    ) {
      e.preventDefault();
      fetchAiDate({
        longitude: coordinates[1].toString(),
        latitude: coordinates[0].toString(),
        level: state.level,
        price: state.price,
        rooms: state.rooms,
        area: state.area,
      });
    }
  };

  return (
    <>
      <h3 className="my-4 mt-5 font-bold text-xl">
        Specify your current findings:
      </h3>
      <form onSubmit={submitAIDate} className="'w-full p-2 rounded-l-md z-10">
        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
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
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ExtraFormInputs;
