// types/index.d.ts
declare global {
  interface Window {
    ymaps: any;
  }
}

export interface MarkerData {
  coordinates: [number, number];
  hintContent?: string;
  balloonContent?: string;
}
