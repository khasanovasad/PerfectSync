import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MarkerData } from '../types';
import { UZBEKISTAN_BOUNDS } from '../utils/constants';
import { loadYandexMaps } from '../utils/loadYandexMap';
import { useAISuggestions } from './useAISuggestions';

const useYandexMap = (
  markersData: MarkerData[],
  apiKey: string,
  suggestKey: string
) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const { results, fetchAiDate } = useAISuggestions();

  useEffect(() => {
    const initMap = () => {
      if (!mapContainer.current) return;
      if (mapInstance.current) return;

      mapInstance.current = new window.ymaps.Map(mapContainer.current, {
        center: [41.2995, 69.2401],
        zoom: 10,
      });

      mapInstance.current.controls.remove('searchControl');
      addMarkers(markersData);
    };

    loadYandexMaps({ apiKey, suggestKey, onLoad: initMap });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [markersData, apiKey]);

  useEffect(() => {
    if (coordinates === null) {
      return;
    }
    fetchAiDate({
      latitude: coordinates[0].toString(),
      longitude: coordinates[1].toString(),
    });
  }, [coordinates]);

  const addMarkers = (markers: MarkerData[]) => {
    markers.forEach((marker) => {
      const placemark = new window.ymaps.Placemark(
        marker.coordinates,
        {
          hintContent: marker.hintContent,
          balloonContent: marker.balloonContent,
        },
        {
          preset: 'islands#icon',
          iconColor: '#0000FF',
        }
      );
      mapInstance.current.geoObjects.add(placemark);
    });
  };

  const handleSearch = (searchQuery: string) => {
    if (!window.ymaps || !searchQuery) return;

    window.ymaps
      .geocode(searchQuery, {
        boundedBy: UZBEKISTAN_BOUNDS,
        strictBounds: true,
        results: 1,
      })
      .then((res: any) => {
        const geoObject = res.geoObjects.get(0);
        if (geoObject) {
          const coordinates = geoObject.geometry.getCoordinates();
          setCoordinates(coordinates);
          const address = geoObject.getAddressLine();
          mapInstance.current.setCenter(coordinates, 12, {
            duration: 500,
          });

          const placemark = new window.ymaps.Placemark(
            coordinates,
            {
              hintContent: address || 'Location',
              balloonContent: `You searched for: ${searchQuery}`,
            },
            {
              preset: 'islands#icon',
              iconColor: '#FF0000',
            }
          );

          mapInstance.current.geoObjects.removeAll();
          addMarkers(markersData);
          mapInstance.current.geoObjects.add(placemark);
        } else {
          alert('Address not found within Uzbekistan!');
        }
      })
      .catch((error: any) => {
        console.error('Geocoding error:', error);
        alert('Error finding location!');
      });
  };

  // Throttled and debounced fetchSuggestions function
  const throttledFetchSuggestions = useCallback(
    throttle((query: string) => {
      if (!window.ymaps || !query) return;

      window.ymaps
        .suggest(query, {
          boundedBy: UZBEKISTAN_BOUNDS, // Restrict to Uzbekistan
          results: 5, // Limit to 5 results
        })
        .then((suggestions: any[]) => {
          console.log(suggestions);
          const suggestionStrings = suggestions.map(
            (suggestion: any) => suggestion.displayName
          );
          setSuggestions(suggestionStrings);
        })
        .catch((error: any) => {
          console.error('Suggestions error:', error);
        });
    }, 500), // Throttle every 300ms
    []
  );

  // Debounce for handling user input changes and call the throttled fetchSuggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      throttledFetchSuggestions(query);
    }, 500), // Debounce with 300ms
    [throttledFetchSuggestions]
  );

  const selectSuggestion = (suggestion: string) => {
    setSuggestions([]);
    handleSearch(suggestion);
  };

  return {
    mapContainer,
    handleSearch,
    fetchSuggestions: debouncedFetchSuggestions,
    suggestions,
    selectSuggestion,
    coordinates,
  };
};

export default useYandexMap;
