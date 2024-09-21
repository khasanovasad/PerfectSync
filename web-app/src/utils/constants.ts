export const YANDEX_MAPS_API_URL = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YANDEX_API_KEY}&lang=en_US`
export const UZBEKISTAN_BOUNDS = [
  [37.1851, 55.9966], // Southwest corner (near Karakalpakstan)
  [45.5907, 73.1486], // Northeast corner (near Ferghana Valley)
]
export const INITIAL_MAP_CENTER = [41.2995, 69.2401] // Tashkent coordinates
export const MAP_ZOOM_LEVEL = 10
