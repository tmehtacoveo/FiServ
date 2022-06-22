import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from "../assets/FileTypeIcons/pdf.png";
import htmlIcon from "../assets/FileTypeIcons/html.png";
import { ResultTemplatesHelpers } from "@coveo/headless";
import PeopleResultTemplate from "../searchResultTemplates/PeopleResultTemplate";
import VideoResultTemplate from "../searchResultTemplates/VideoResultTemplate";
import { Result } from "@coveo/headless";
import { DefaultSideBarRecommendationConfigType } from "./ConfigTypes";


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
  },
];

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

export const FileTypeIconsConfig = {
  pdf: pdfIcon,
  html: htmlIcon,
};

export const FieldToIncludesInSearchResults = [
  "sfanswer__c",
  "sfid",
  "sysfiletype",
  "date",
  "adimage",
  "ytthumbnailurl",
];

export const SearchPageTabConfig = [
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
      },
    ],
    facetToInclude: ["source", "filetype", "concepts"],
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
    facetToInclude: ["source", "concepts"],
  },
  {
    caption: "Money Matters",
    expression: `@source==("Nerd Wallet","Credit Cards","Bankrate","Insurance Advice")`,
    isActive: false,
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
  },
  {
    caption: "Banking Info",
    expression: `@source==("Bankrate")`,
    isActive: false,
  },
  {
    caption: "Advisors",
    expression: `@source==("Advisor")`,
    isActive: false,
  },
  {
    caption: "Youtube",
    expression: `@filetype=="youtubevideo"`,
    isActive: false,
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
