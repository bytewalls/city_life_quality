import axios from 'axios';

const alternateName = (alternateNames, searchTerm) => {
  if (!alternateNames.length) {
    return null;
  }

  const matchingName = alternateNames.find((c) => c.name === searchTerm);

  return matchingName ? matchingName.name : alternateNames[0].name;
};

const cityBuilder = (city, searchTerm) => (
  {
    shortName: alternateName(city.matching_alternate_names, searchTerm),
    longName: city.matching_full_name,
    link: city._links['city:item'].href,
  }
);

const findCities = (search) => (
  axios.get('https://api.teleport.org/api/cities', {
    params: {
      search,
    },
  }).then((result) => (
    result
      .data
      ._embedded['city:search-results']
      .map((city) => cityBuilder(city, search))
  ))
);

const cityInformation = (link) => axios.get(link);

export default {
  findCities,
  cityInformation,
};
