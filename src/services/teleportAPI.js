import axios from 'axios';

const alternateName = (alternateNames, searchTerm) => {
  if (!alternateNames.length) {
    return null;
  }

  const matchingName = alternateNames.find((c) => c.name === searchTerm);

  return matchingName ? matchingName.name : alternateNames[0].name;
};

const getLinkData = async (link, params = null) => (
  axios.get(link, params).then((result) => result.data)
);

const cityBuilder = (city, searchTerm) => (
  {
    shortName: alternateName(city.matching_alternate_names, searchTerm),
    longName: city.matching_full_name,
    link: city._links['city:item'].href,
  }
);

const findCities = async (search) => {
  const data = await getLinkData('https://api.teleport.org/api/cities', {
    params: {
      search,
    },
  });

  return data
      ._embedded['city:search-results']
      .map((city) => cityBuilder(city, search));
};

const getCityData = async (link) => {
  const city = await getLinkData(link);
  const urban = await getLinkData(city._links['city:urban_area'].href);
  const details = await getLinkData(urban._links['ua:details'].href);
  const salaries = await getLinkData(urban._links['ua:salaries'].href);
  const scores = await getLinkData(urban._links['ua:scores'].href);

  return {
    city,
    urban,
    details,
    salaries,
    scores,
  };
};

export {
  findCities,
  getCityData,
};
