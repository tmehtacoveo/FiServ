import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import List from "@mui/material/List";
import { ListItem, Box, Typography } from "@mui/material";
import {
  buildResultList,
  Result,
  buildResultTemplatesManager,
  ResultTemplatesManager,
  ResultList as HeadlessResultList,
  buildInteractiveResult,
  SearchEngine,
  ResultTemplatesHelpers,
} from "@coveo/headless";
import EngineContext from "../common/engineContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { width } from "@mui/system";
import pdfIcon from "../assets/FileTypeIcons/pdf.png";
import { Theme } from "../theme";
import { FileTypeIconsConfig } from "../config/SearchConfig";
import {eye} from 'react-icons-kit/feather/eye'
import Icon from "react-icons-kit";
import QuickViewModal from "../Components/SearchPage/QuickViewModal";
import { QuickViewModalContext } from "../Components/SearchPage/QuickViewModalContext";

type Template = (result: Result) => React.ReactNode;

export function filterProtocol(uri: string) {
  // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
  const isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
  const isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);

  return isAbsolute || isRelative ? uri : "";
}

interface FieldValueInterface {
  value: string;
  caption: string;
}

function ListItemLink(
  engine: SearchEngine,
  result: Result,
  source?: string,
  QuickViewOnClick? : boolean,
  setResult?: (x: Result) => void
) {
  const interactiveResult = buildInteractiveResult(engine, {
    options: { result },
  });
  return (
    <>
      {source === "Salesforce KB" ? (
        <Link
          to={`/salesforcekb/${result.raw.sfid}`}
          onClick={() => {
            
            if (setResult) {
              setResult(result);
            }
            interactiveResult.select();
          }}
          onContextMenu={() => interactiveResult.select()}
          onMouseDown={() => interactiveResult.select()}
          onMouseUp={() => interactiveResult.select()}
          onTouchStart={() => interactiveResult.beginDelayedSelect()}
          onTouchEnd={() => interactiveResult.cancelPendingSelect()}
        >
          {result.title}
        </Link>
      ) : (
        <a
          href={filterProtocol(result.clickUri)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => interactiveResult.select()}
          onContextMenu={() => interactiveResult.select()}
          onMouseDown={() => interactiveResult.select()}
          onMouseUp={() => interactiveResult.select()}
          onTouchStart={() => interactiveResult.beginDelayedSelect()}
          onTouchEnd={() => interactiveResult.cancelPendingSelect()}
        >
          {result.title}
        </a>
      )}
    </>
  );
}

function FieldValue(props: FieldValueInterface) {
  return (
    /*   <Box> */
    <>
      {" "}
      <Typography
        color="textSecondary"
        style={{ fontWeight: "bold" }}
        variant="caption"
      >
        {props.caption}:&nbsp;
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {props.value}
      </Typography>
    </>

    /*  </Box> */
  );
}

const GeneralResultTemplate: React.FC<{ result: Result, QuickViewOnClick : boolean }> = ({ result, QuickViewOnClick = false }) => {
  const engine = useContext(EngineContext)!;
  const {setOpenModal, setResult} = useContext(QuickViewModalContext)!;
  const filetype: any = result.raw.sysfiletype;
  const date = new Date(Number(result.raw.date));
  const isFileTypeIconIndex = () => {
    if (Object.keys(FileTypeIconsConfig).indexOf(filetype) > 0) {
      return Object.keys(FileTypeIconsConfig).indexOf(filetype);
    }
    return 0;
  };


  const highlightedExcerpt = (result :  Result)=>{
    let highlightedString = result.excerpt;
    let adjustmentoffset = 0;
    result.excerptHighlights.forEach((item)=>{
    highlightedString =  highlightedString.slice(0,item.offset + adjustmentoffset) + "<b>" + highlightedString.slice(item.offset + adjustmentoffset,item.offset + adjustmentoffset + item.length) + "</b>" + highlightedString.slice(item.offset + adjustmentoffset + item.length);
    adjustmentoffset = adjustmentoffset + 7;
    })
    return highlightedString;

  }


  return (
    <>
      <ListItem disableGutters key={result.uniqueId}>
        <Box my={1}>
          <BadgeWrapper>
          {result.isRecommendation && (
            <RecommendationBadge>Recommended</RecommendationBadge>
          )}
          {result.isTopResult && (
            <RecommendationBadge>Featured</RecommendationBadge>
          )}
          </BadgeWrapper>
          <MainWrapper>
            {filetype in FileTypeIconsConfig && (
              <SourceTypeWrapper>
                <IconImage
                  src={
                    Object.values(FileTypeIconsConfig)[isFileTypeIconIndex()]
                  }
                  alt={`${filetype} icon`}
                />
              </SourceTypeWrapper>
            )}
            <TextWrapper>
              <TitltAndDateWrapper>
                <Title>{ListItemLink(engine, result, "",QuickViewOnClick)}</Title>
                {QuickViewOnClick &&
                <Icon icon = {eye} style = {{cursor : 'pointer', marginRight: '10px'}} onClick={()=>{
                  setResult(result);
                  setOpenModal(true);
                }}/>}
                {result.raw.date && (
                  <Excerpt>
                    {date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()}
                  </Excerpt>
                )}
              </TitltAndDateWrapper>
              {result.excerpt && (
                <Box pb={1}>
                  <Excerpt dangerouslySetInnerHTML={{ __html: highlightedExcerpt(result) }} />
                </Box>
              )}
            </TextWrapper>
          </MainWrapper>
        </Box>
      </ListItem>
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "#E5E8E8",
        }}
      />
    </>
  );
};

export default GeneralResultTemplate;

const MainWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
`;

const SourceTypeWrapper = styled.div`
  width: 100px;
  height: 100px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
   display: none;
}
`;

const IconImage = styled.img`
  width: 60px;
  height: 60px;
`;

const TextWrapper = styled.div`
  flex: 8;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: inherit;
  font-size: 20px;
  line-height: 24px;
  width: 80%;


  & a {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 400;
    text-decoration: none;
    color: ${Theme.resultLink};
  }

  & a:hover {
    text-decoration: underline;
  }
  @media (max-width: 480px) {
   font-size: 18px;
   & a {
    display: -webkit-box;
    -webkit-line-clamp: 2;
   }
}
`;

const Excerpt = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  color: ${Theme.excerpt};
  font-family: inherit;
  font-weight: 300px;
  @media (max-width: 480px) {
   font-size: 12px;
}

& b{
  font-weight: 400;
}
`;

const RecommendationBadge = styled.div`
  background: #f6f7f9;
  width: 100px;
  height: 20px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${Theme.excerpt};
`;

const TitltAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 210px;
  justify-content: space-between;

`