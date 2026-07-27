const REST_COUNTRIES_URL =
  "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,codes.alpha_2,calling_codes,flag.emoji";
const REST_COUNTRIES_API_KEY = "rc_live_1d7cae4492cc4328a3013c251c21d624";

type RestCountry = {
  names?: {
    common?: string;
  };
  codes?: {
    alpha_2?: string;
  };
  calling_codes?: string[];
  flag?: {
    emoji?: string;
  };
};

type RestCountriesResponse = {
  data?: {
    objects?: RestCountry[];
    meta?: {
      count?: number;
      more?: boolean;
      offset?: number;
    };
  };
  errors?: Array<{
    message?: string;
  }>;
};

export type CountryPhoneDetails = {
  name: string;
  isoCode: string;
  callingCode: string;
  flag: string;
};

function normalizeCountry(country: RestCountry): CountryPhoneDetails | null {
  const callingCode = country.calling_codes?.[0];
  const isoCode = country.codes?.alpha_2;
  const name = country.names?.common;

  if (!callingCode || !isoCode || !name) {
    return null;
  }

  return {
    name,
    isoCode,
    callingCode: `+${callingCode.replace(/^\+/, "")}`,
    flag: country.flag?.emoji ?? "🏳️",
  };
}

export async function fetchCountries(
  signal?: AbortSignal
): Promise<CountryPhoneDetails[]> {
  const countries: CountryPhoneDetails[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${REST_COUNTRIES_URL}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${REST_COUNTRIES_API_KEY}`,
      },
      signal,
    });
    const payload = (await response.json()) as RestCountriesResponse;

    if (!response.ok) {
      throw new Error(
        payload.errors?.[0]?.message ??
          `Countries request failed (${response.status})`
      );
    }

    const objects = payload.data?.objects ?? [];
    countries.push(
      ...objects
        .map(normalizeCountry)
        .filter((item): item is CountryPhoneDetails => item !== null)
    );

    hasMore = payload.data?.meta?.more === true;
    offset += payload.data?.meta?.count ?? objects.length;

    if (objects.length === 0) {
      hasMore = false;
    }
  }

  return countries.sort((first, second) =>
    first.name.localeCompare(second.name)
  );
}
