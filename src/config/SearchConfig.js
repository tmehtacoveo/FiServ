import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from "../assets/FileTypeIcons/pdf.png";
import htmlIcon from "../assets/FileTypeIcons/html.png";
import { ResultTemplatesHelpers } from "@coveo/headless";
import PeopleResultTemplate from "../searchResultTemplates/PeopleResultTemplate";
import VideoResultTemplate from "../searchResultTemplates/VideoResultTemplate";


export const SearchEnginePipeline = 'Investing'

export const ResultTemplateConfig = [
  {
    conditions: [],
    content: (result) => <GeneralResultTemplate result={result} />,
    priority: 1
  },
  {
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch("source",["Advisor"])
    ],
    content: (result) => <PeopleResultTemplate result={result} imageField = {'adimage'} />,
    priority : 2
  },{
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch("filetype",["youtubevideo"])
    ],
    content: (result) => <VideoResultTemplate result={result} imageField = {'ytthumbnailurl'} />,
    priority : 2
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
  "ytthumbnailurl"
];

export const SearchPageTabConfig = [
  {
    caption: "All Content",
    expression: "",
    isActive: true,
    sideBarRecommendationConfig: {
      pipeline: "Video Rec Sidebar",
      NumberofResults: 5,
      title: "Related Videos",
      video: true,
    },
  },
  {
    caption: "Investing",
    expression: `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
    isActive: false,
    sideBarRecommendationConfig: {
      pipeline: "IRS test",
      NumberofResults: 6,
      title: "Related for Investing",
    },
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
    sideBarRecommendationConfig: {
      pipeline: "Glossary test",
      NumberofResults: 6,
      title: "Glossary",
    },
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
