export type Food = {
  products: { [key: string]: Product };
  chomp:    Chomp;
}

export type Chomp = {
  request:  Request;
  response: Response;
}

export type Request = {
  country:    string;
  brand:      string;
  category:   string;
  lifestyle:  string;
  keyword:    string;
  ingredient: string;
  trace:      string;
  palm_oil:   string;
  nutrition:  string;
  allergen:   string;
  mineral:    string;
  vitamin:    string;
}

export type Response = {
  products_found: number;
}

export type Product = {
  product_id:   number;
  name:         string;
  manufacturer: Manufacturer;
  upc:          string;
  details:      Details;
}

export type Details = {
  name:                          string;
  barcode:                       string;
  upc:                           string;
  brand:                         Manufacturer;
  ingredients:                   string;
  package_size:                  PackageSize;
  serving_size:                  string;
  brands:                        Brands;
  countries:                     Countries;
  has_english_ingredients:       number;
  country_details:               CountryDetails;
  images:                        Images;
  ingredient_tags:               { [key: string]: string };
  keywords:                      Keywords;
  lifestyle_flagged_ingredients: { [key: string]: LifestyleFlaggedIngredient };
  lifestyle:                     Lifestyle;
  mineral_tags:                  MineralTagsUnion;
  nutrition_label:               { [key: string]: NutritionLabel };
  vitamin_tags:                  VitaminTagsUnion;
  allergens:                     any[];
  categories:                    any[];
  ingredients_from_palm_oil:     any[];
  traces_tags:                   any[];
}

export enum Manufacturer {
  Aidells = "Aidells",
  AidellsSausageCompany = "Aidells Sausage Company",
  Giant = "Giant",
}

export type Brands = {
  giant?:                     Manufacturer;
  "aidells-sausage-company"?: Manufacturer;
  aidells?:                   Manufacturer;
}

export type Countries = {
  "united-states": UnitedStates;
}

export enum UnitedStates {
  UnitedStates = "United States",
}

export type CountryDetails = {
  english_speaking:     number;
  non_english_speaking: number;
}

export type Images = {
  front:       Front;
  nutrition:   Front;
  ingredients: Front;
}

export type Front = {
  small:   string;
  thumb:   string;
  display: string;
}

export type Keywords = {
  breaded?:    string;
  chicken:     Chicken;
  giant?:      Manufacturer;
  parmesan?:   string;
  aidell?:     string;
  chile?:      string;
  company?:    string;
  green?:      string;
  habanero?:   string;
  meat?:       string;
  meatball?:   string;
  prepared?:   string;
  sausage?:    string;
  smoked?:     string;
  all?:        string;
  cheese?:     string;
  italian?:    string;
  mozzarella?: string;
  natural?:    string;
  style?:      string;
  breakfast?:  string;
  chorizo?:    string;
  link?:       string;
  maple?:      string;
  sage?:       string;
  artichoke?:  string;
  garlic?:     string;
  apple?:      string;
  mango?:      string;
  feta?:       string;
  spinach?:    string;
}

export enum Chicken {
  Chicken = "Chicken",
}

export type Lifestyle = {
  vegan:         GlutenFree;
  vegetarian:    GlutenFree;
  "gluten-free": GlutenFree;
}

export type GlutenFree = {
  id:                    number;
  name:                  Name;
  is_compatible:         IsCompatible;
  compatibility:         number;
  grade_confidence:      boolean;
  grade_confidence_desc: string;
}

export enum IsCompatible {
  Maybe = "Maybe",
  No = "No",
  Yes = "Yes",
}

export enum Name {
  GlutenFree = "Gluten Free",
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
}

export type LifestyleFlaggedIngredient = {
  lifestyle_id:              number;
  lifestyle_name:            Name;
  id:                        number;
  name:                      string;
  description:               string;
  is_compatible:             IsCompatible;
  compatibility:             number;
  compatibility_description: CompatibilityDescription;
}

export enum CompatibilityDescription {
  BannedNotAcceptableForDietLifestyle = "Banned - Not acceptable for diet/lifestyle.",
  NotNecessarilyBannedConsiderTheSourceOfEachIngredient = "Not necessarily banned. Consider the source of each ingredient.",
}

export type MineralTagsUnion = any[] | MineralTagsClass;

export type MineralTagsClass = {
  "calcium-chloride": string;
  "ferrous-sulfate":  string;
  "sodium-phosphate": string;
}

export type NutritionLabel = {
  name:        string;
  measurement: Measurement;
  per_100g:    number;
  per_serving: number;
}

export enum Measurement {
  Empty = "",
  G = "g",
  Iu = "IU",
  Kj = "kj",
  Mg = "mg",
  Pct = "pct",
  The19431_Unit = "1.9431_unit",
}

export enum PackageSize {
  The100G = "100g",
}

export type VitaminTagsUnion = any[] | VitaminTagsClass;

export type VitaminTagsClass = {
  "folic-acid": string;
  niacin:       string;
  riboflavin:   string;
}
