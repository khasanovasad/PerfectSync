import { MarkerData } from '../types';

export const addMarkers = (map: any, markers: MarkerData[]) => {
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

    map.geoObjects.add(placemark);
  });
};
