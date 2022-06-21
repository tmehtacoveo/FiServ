import GeneralResultTemplate from "../searchResultTemplates/GeneralResultTemplate";
import pdfIcon from '../assets/FileTypeIcons/pdf.png'
import htmlIcon from '../assets/FileTypeIcons/html.png'

export const ResultTemplateConfig = [{
    conditions : [],
    content : (result) => <GeneralResultTemplate result = {result} />
}]

export const FileTypeIconsConfig = {
    'pdf': pdfIcon,
    'html' : htmlIcon
}


export const FieldToIncludesInSearchResults = ['sfanswer__c', 'sfid','sysfiletype','date']


export const SearchPageTabConfig =  [
    {
      caption: "All Content",
      expression: "",
      isActive: true,
    },
    {
      caption: "Investing",
      expression: `@source==("Investopedia","Investopedia Videos","Nerd Wallet") AND @concepts='investment'`,
      isActive: false,
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