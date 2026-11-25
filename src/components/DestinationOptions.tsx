import { countries, cities } from "@/lib/catalog-options";
import { countryLabel } from "@/lib/catalog";

export function DestinationOptions() {
  return (
    <>
      <optgroup label="Países">
        {countries.map((country) => <option key={country} value={country}>{countryLabel(country)}</option>)}
      </optgroup>
      <optgroup label="Ciudades">
        {cities.map((city) => <option key={city} value={city}>{city}</option>)}
      </optgroup>
    </>
  );
}
