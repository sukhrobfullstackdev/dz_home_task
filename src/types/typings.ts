type Constituent = {
    constituentID: number;
    role: string;
    name: string;
    constituentULAN_URL: string;
    constituentWikidata_URL: string;
    gender: string;
  };
  
  type Measurement = {
    elementName: string;
    elementDescription: string;
    elementMeasurements: {
      Diameter: number;
    };
  };
  export type PaginationProps =  {
    totalPages: number;
    page: number;
    isSearching: boolean;
    searchResults: Artwork[]; 
    ITEMS_PER_PAGE: number;
  }
  
  export type Tag = {
    term: string;
    AAT_URL: string;
    Wikidata_URL: string;
  };
  
  export type Artwork = {
    objectID: number;
    isHighlight: boolean;
    accessionNumber: string;
    accessionYear: string;
    isPublicDomain: boolean;
    primaryImage: string;
    primaryImageSmall: string;
    additionalImages: string[];
    constituents: Constituent[] | null;
    department: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    dynasty: string;
    reign: string;
    portfolio: string;
    artistRole: string;
    artistPrefix: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    artistSuffix: string;
    artistAlphaSort: string;
    artistNationality: string;
    artistBeginDate: string;
    artistEndDate: string;
    artistGender: string;
    artistWikidata_URL: string;
    artistULAN_URL: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    measurements: Measurement[];
    creditLine: string;
    geographyType: string;
    city: string;
    state: string;
    county: string;
    country: string;
    region: string;
    subregion: string;
    locale: string;
    locus: string;
    excavation: string;
    river: string;
    classification: string;
    rightsAndReproduction: string;
    linkResource: string;
    metadataDate: string;
    repository: string;
    objectURL: string;
    tags: Tag[] | null;
    objectWikidata_URL: string;
    isTimelineWork: boolean;
    GalleryNumber: string;
  };  