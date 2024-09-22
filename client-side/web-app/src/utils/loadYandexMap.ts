interface YandexMapsParams {
  apiKey: string;
  suggestKey: string;
  onLoad: () => void;
}
export const loadYandexMaps = ({
  apiKey,
  suggestKey,
  onLoad,
}: YandexMapsParams) => {
  if (document.querySelector('script[src*="https://api-maps.yandex.ru"]')) {
    if (window.ymaps) {
      window.ymaps.ready(onLoad);
    }
    return;
  }

  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=en_US&suggest_apikey=${suggestKey}`;
  script.type = 'text/javascript';
  script.onload = () => {
    window.ymaps.ready(onLoad);
  };
  document.body.appendChild(script);
};
