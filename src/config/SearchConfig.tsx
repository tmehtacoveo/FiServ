import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from "../assets/FileTypeIcons/pdf.png";
import htmlIcon from "../assets/FileTypeIcons/html.png";
import { ResultTemplatesHelpers } from "@coveo/headless";
import PeopleResultTemplate from "../searchResultTemplates/PeopleResultTemplate";
import VideoResultTemplate from "../searchResultTemplates/VideoResultTemplate";
import { Result } from "@coveo/headless";
import { DefaultSideBarRecommendationConfigType, FacetConfigType, FileTypeIconsConfigType, SearchPageTabConfigType } from "./ConfigTypes";


export const FacetConfig = [
  {
    field: "source",
    title: "Source",
  },
  {
    field: "filetype",
    title: "File Type",
  },
  {
    field: "concepts",
    title: "Concepts",
  },{
    field : "mynav2b",
    title : "Focus Area"
  },{
    field : "mynav3b",
    title : "Banking Information"
  },{
    field :"adspecial",
    title : "Speciality"
  },{
    field :"adminimums",
    title : "Minimums"
  },{
    field :"adstate",
    title : "State"
  },{
    field :"adcity",
    title : "City"
  }
] as const;




export const ResultTemplateConfig = [
  {
    conditions: [],
    content: (result: Result) => <GeneralResultTemplate result={result} />,
    priority: 1,
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("source", ["Advisor"])],
    content: (result: Result) => (
      <PeopleResultTemplate result={result} imageField={"adimage"} />
    ),
    priority: 2,
  },
  {
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch("filetype", ["youtubevideo"]),
    ],
    content: (result: Result) => (
      <VideoResultTemplate result={result} imageField={"ytthumbnailurl"} />
    ),
    priority: 2,
  },
];

export const FileTypeIconsConfig  = {
  pdf: pdfIcon,
  html: htmlIcon,
};

export const FieldToIncludesInSearchResults : string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype",
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
];



export const SearchPageTabConfig : SearchPageTabConfigType[] = [
  {
    caption: "All Content",
    expression: "",
    isActive: true,
    sideBarRecommendationConfig: [
      {
        pipeline: "Video Rec Sidebar",
        NumberofResults: 3,
        title: "Related Videos",
        video: true,
      }
    ],
    facetToInclude: ["source", "filetype", "concepts",],
  },
  {
    caption: "Investing",
    expression: `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
    isActive: false,
    sideBarRecommendationConfig: [
      {
        pipeline: "IRS test",
        NumberofResults: 6,
        title: "Related for Investing",
        video: false,
      },
    ],
    facetToInclude: ["concepts","mynav2b"],
  },
  {
    caption: "Money Matters",
    expression: `@source==("Nerd Wallet","Credit Cards","Bankrate","Insurance Advice")`,
    isActive: false,
    facetToInclude: ["concepts","mynav2b"],
  },
  {
    caption: "Insurance Needs",
    expression: `@source==("Insurance Information","Insurance Advice","Policy Genius","Nerd Wallet") AND @concepts='insurance'`,
    isActive: false,
    sideBarRecommendationConfig: [
      {
        pipeline: "Glossary test",
        NumberofResults: 6,
        title: "Glossary",
        video: false,
      },
    ],
    facetToInclude: ["concepts"],
  },
  {
    caption: "Banking Info",
    expression: `@source==("Bankrate")`,
    isActive: false,
    facetToInclude: ["concepts","mynav2b","mynav3b"],
  },
  {
    caption: "Advisors",
    expression: `@source==("Advisor")`,
    isActive: false,
    facetToInclude: ["adspecial","adminimums","adstate","adcity"],
  },
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo"`,
    isActive: false,
    facetToInclude: ["concepts"],
  },
];



export const DefaultSideBarRecommendationConfig: DefaultSideBarRecommendationConfigType[] =
  []; /* [{
  pipeline: "IRS test",
  NumberofResults: 5,
  title: "Related for Investing",
  video : false
}] */

export const ResultsPerPagesConfig = [10, 25, 50];
