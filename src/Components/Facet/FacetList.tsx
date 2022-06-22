import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Facet from "./Facet";
import { useParams } from "react-router-dom";
import { FacetConfig, SearchPageTabConfig } from "../../config/SearchConfig";
import React from "react";

const FacetList = () => {
  const { filter } = useParams();

  console.log("filter", filter);

  const FacetFieldInSearchTabs = () => {
    return SearchPageTabConfig.map((item) => {
      if (item.facetToInclude) {
        return item.facetToInclude;
      }
      return null;
    });
  };

  console.log(FacetFieldInSearchTabs());

  return (
    <Box>
      <Box px={1} pb={1} mt={4}>
        {/*         <Typography variant="overline">Refined By</Typography> */}
        {SearchPageTabConfig.length > 0 && SearchPageTabConfig !== undefined ? (
          <>
            {SearchPageTabConfig.map((item, index) => {
              if (
                (item.facetToInclude &&
                  filter?.toLowerCase() ===
                    item.caption.replace(/\s/g, "").toLowerCase()) ||
                (index === 0 && filter === undefined && item.facetToInclude)
              ) {
                return (
                  <React.Fragment key = {item.caption}>
                    {item.facetToInclude && item.facetToInclude.map((item : any) => {
                      return (
                        <React.Fragment key = {item}>
                        <Facet
                          field={item}
                          title={
                            FacetConfig.find((x) => x.field === item)?.title
                          }
                        />
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              }

              /*  if(item.facetToInclude){
              
              return <React.Fragment key = {item.caption}>
              {item.facetToInclude.map((item)=>{

                return <Facet field={item} title={FacetConfig.find(x => x.field === item).title} />
              })}
              <React.Fragment/>
            } */
            })}
          </>
        ) : (
          <>
            <Facet field="source" title="Source" />
            <Facet field="filetype" title="File Type" />
            <Facet field="concepts" title="Concepts" />
          </>
        )}
      </Box>
    </Box>
  );
};

export default FacetList;
