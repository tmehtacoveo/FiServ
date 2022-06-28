import { FacetConfig } from "./SearchConfig";

export interface DefaultSideBarRecommendationConfigType {
    pipeline: string,
    NumberofResults: number,
    title: string
    video? : boolean
  }



type FacetFieldValue = typeof FacetConfig[number]['field']

export interface FacetConfigType {
  field : string,
  title : string
}  


export interface FileTypeIconsConfigType {
  imageRef : string; 
}


interface sideBarRecommendationConfigType {
  pipeline : string;
  NumberofResults: number;
  title: string;
  video: boolean;
}

export interface SearchPageTabConfigType {
  caption : string;
  expression : string;
  isActive : boolean;
  sideBarRecommendationConfig? : sideBarRecommendationConfigType[];
  facetToInclude? : FacetFieldValue[]
}