import { useCallback } from 'react';

export const useWeather = () => {
  const handelWeatherApi = useCallback(async () => {
    // get the temp of 7 days from this today
    // to get the lat nd lon fo a city ce chey google map for that city
    const PARISLAT = 48.8589506;
    const PARISLON = 2.2768485;
    const APIKEY = 'd7bc3b0ed97431f3196d3221974b7dd5';
    let sevenDaysWeather = {};
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${PARISLAT}&lon=${PARISLON}&appid=${APIKEY}`,
    );
    //todo: remove await response
    const data = await response.json();

    try {
      let daily = {};
      for (const key in data.daily) {
        const today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + parseInt(key, 10)); // key ==> str => cast it to int

        const fullDate = `${tomorrow.getFullYear()}-${towDigit(
          tomorrow.getMonth() + 1,
        )}-${towDigit(tomorrow.getDate())}`; // 2021-07-26

        // dailyTemp = { ...dailyTemp, [fullDate]: data?.daily?.[key]?.temp };
        daily[[fullDate]] = data?.daily?.[key]?.temp;
      }
      sevenDaysWeather = daily;
    } catch (error) {
      console.log(`error`, error);
    }
    return sevenDaysWeather;
  }, []);

  const towDigit = str => {
    return parseInt(str, 10) > 9
      ? '' + parseInt(str, 10)
      : '0' + parseInt(str, 10);
  };
  return { handelWeatherApi };
};

export default useWeather;
