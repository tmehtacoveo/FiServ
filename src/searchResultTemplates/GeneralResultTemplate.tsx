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

const GeneralResultTemplate: React.FC<{ result: Result }> = ({ result }) => {
  const engine = useContext(EngineContext)!;
  const filetype: any = result.raw.sysfiletype;
  const date = new Date(Number(result.raw.date));
  const isFileTypeIconIndex = () => {
    if (Object.keys(FileTypeIconsConfig).indexOf(filetype) > 0) {
      return Object.keys(FileTypeIconsConfig).indexOf(filetype);
    }
    return 0;
  };

  return (
    <>
      <ListItem disableGutters key={result.uniqueId}>
        <Box my={1}>
          {result.isRecommendation && (
            <RecommendationBadge>Recommended</RecommendationBadge>
          )}
          <MainWrapper>
            {filetype in FileTypeIconsConfig && (
              <SourceTypeWrapper>
                <IconImage
                  src={
                    Object.values(FileTypeIconsConfig)[isFileTypeIconIndex()]
                  }
                  alt={"pdf icon"}
                />
              </SourceTypeWrapper>
            )}
            <TextWrapper>
              <TitltAndDateWrapper>
                <Title>{ListItemLink(engine, result)} </Title>
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
                  <Excerpt>{result.excerpt}</Excerpt>
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
  font-family: "Gibson";
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
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  color: #626971;
  font-family: inherit;
  font-weight: 300px;
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
  color: #626971;
`;

const TitltAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
