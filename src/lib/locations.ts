import { getNames } from "country-list";

// Country select options. Sourced from the ISO 3166-1 list via the
// `country-list` package so the data stays maintained outside this
// repo. The list is alphabetical with "United States" pinned to the
// top so the default selection is immediately visible without
// scrolling.
export function getCountryOptions(): string[] {
  const all = getNames();
  const us = "United States of America";
  const rest = all.filter((name) => name !== us).sort((a, b) => a.localeCompare(b));
  return [us, ...rest];
}

export const DEFAULT_COUNTRY = "United States of America";

// 50 states + DC + the five inhabited US territories. Used by the
// conditional state dropdown that appears when country === DEFAULT_COUNTRY.
// District of Columbia and the territories sit in alphabetical order
// alongside the states; renderers can group them visually if desired.
export const US_STATES_AND_TERRITORIES: readonly string[] = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "U.S. Virgin Islands",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
