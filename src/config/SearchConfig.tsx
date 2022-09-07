import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from "../assets/FileTypeIcons/pdf.svg";
import htmlIcon from "../assets/FileTypeIcons/html.svg";
import docIcon from "../assets/FileTypeIcons/doc.svg";
import pptIcon from "../assets/FileTypeIcons/ppt.svg";
import pubIcon from "../assets/FileTypeIcons/pub.svg";
import sfIcon from "../assets/FileTypeIcons/sf.svg";
import { ResultTemplatesHelpers } from "@coveo/headless";
import PeopleResultTemplate from "../searchResultTemplates/PeopleResultTemplate";
import VideoResultTemplate from "../searchResultTemplates/VideoResultTemplate";
import { Result } from "@coveo/headless";
import { DefaultSideBarRecommendationConfigType, SearchPageTabConfigType } from "./Types/ConfigTypes";
import CustomPeopleResultTemplate from "../searchResultTemplates/CustomPeopleResultTemplate";


/* 
FacetConfig is used to initialize all the facet when the webpage loads up, 
You can later set which facet to show in each Tab
*/

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
  },{
    title: "More Info",
    field : "mynav4b"
  }
] as const;


/* 
ResultTemplateConfig helps you select which result template to show on which condition. At moment there are 3 genertic result template:
1. GeneralResultTemplate
2. PeopleResultTemplate
3. VideoResultTemplate

You can create custom one using the searchResultTemplates/GeneralResultTemplate.tsx as template. 
*/

export const ResultTemplateConfig = [
  {
    conditions: [],
    content: (result: Result) => <GeneralResultTemplate 
    result={result} 
    QuickViewOnClick = {true} 
    FieldValues = {[{caption: 'Source Type', value : 'sysfiletype'},{caption: 'source', value : 'source'}]} />,
    priority: 1,
  },
  {
    conditions: [ResultTemplatesHelpers.fieldMustMatch("source", ["Advisor"])],
    content: (result: Result) => (
      <CustomPeopleResultTemplate result={result} imageField={"adimage"} />
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



/* 
FileTypeIconsConfig helps you add file type icons in the GeneralResultTemplate.
The key should be the field raw.sysfiletype e.g html,pdf,doc etc

You can add more images to the assets/FileTypeIcons folder. Make sure to import the in the top of this file using the following statement.

    import newIconName from "../assets/FileTypeIcons/newIconName.png";

*/

export const FileTypeIconsConfig  = {
  pdf: pdfIcon,
  html: htmlIcon,
  epub: pubIcon,
  doc : docIcon,
  SalesforceItem : sfIcon,
};





/* 
FieldToIncludesInSearchResults helps you add more fields to the result templates. 
When setting imageField in this file, make sure the field is included in the FieldToIncludesInSearchResults array. 

The fields 'date', 'ytthumbnailurl', 'sysfiletype' should NOT be removed. 
*/

export const FieldToIncludesInSearchResults : string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype", 
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
  'adspecial'
];





/* 
SearchPageTabConfig helps you configure the Tabs. Each object represent a new Tab.

 - caption -> Name of the Tab
 - expression -> query expression to show in the Tab
 - isActive -> To be active initially when search page loads up
 - sideBarRecommendationConfig -> Can add multiple recommendation in the side bar
 - facetToInclude -> facets to show on a particular Tab


You can leave the Array empty if you don't want any tabs

*/

export const SearchPageTabConfig : SearchPageTabConfigType[] = [
  {
    caption: "All",
    expression: "",
    isActive: true,
    sideBarRecommendationConfig: [
      {
        pipeline: "Video Rec Sidebar",
        NumberofResults: 3,
        title: "Related Videos",
        videoRecommendation: true,
        imageField: 'ytthumbnailurl'
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
        videoRecommendation: false,
      },
    ],
    facetToInclude: ["concepts","mynav2b"],
  },
  {
    caption: "Money Matters",
    expression: `@source==("Nerd Wallet","Credit Cards","Bankrate","Insurance Advice")`,
    isActive: false,
    facetToInclude: ["concepts","mynav2b", "mynav4b"],
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
        videoRecommendation: false,
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



/* 
DefaultSideBarRecommendationConfig is used if you want to show same sideBar recommendation on each tab.
*/

export const DefaultSideBarRecommendationConfig: DefaultSideBarRecommendationConfigType[] =
  []; /* [{
  pipeline: "IRS test",
  NumberofResults: 5,
  title: "Related for Investing",
  videoRecommendation: true,
  imageField: 'ytthumbnailurl'
}] */

export const ResultsPerPagesConfig = [10, 25, 50];
