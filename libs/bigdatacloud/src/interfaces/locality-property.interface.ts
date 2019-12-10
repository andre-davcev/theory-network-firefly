export interface LocalityProperty
{
    /*
      Order value consistent across all entities in the Locality Info parent
      object. Ordered by area (largest first)
    */
    order: number

    /*
      An administrative level as defined by OpenStreetMaps project
    */
    adminLevel: number;

    /*
      Localised name. The language is as defined by ‘localityLanguage’ request
      parameter
    */
    name: string;

    /*
      Localised description. The language is as defined by ‘localityLanguage’
      request parameter
    */
    description: string;

    /*
      ISO 3166-2 standard name, if available
    */
    isoName: string;

    /*
      ISO 3166-2 standard code, if available
    */
    isoCode: string;

    /*
      Wikidata item identifier, if available
    */
    wikidataId: string;
}
