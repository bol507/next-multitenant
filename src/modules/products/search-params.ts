import { createLoader, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs/server";

export const sortValues = ["curated", "trending", "hot_and_new"] as const;

export const params = {
  minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }).withDefault(""),
  maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    }).withDefault([]),
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
};

export const loadProductFilters = createLoader(params);