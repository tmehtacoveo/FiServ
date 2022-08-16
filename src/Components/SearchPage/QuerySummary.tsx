import {FunctionComponent, useEffect, useState, useContext} from 'react';
import {
  buildQuerySummary,
  QuerySummary as HeadlessQuerySummary,
} from '@coveo/headless';
import {Box, Divider} from '@mui/material';
import EngineContext from '../../common/engineContext';
import styled from "styled-components";
import {Theme} from "../../theme";

interface QuerySummaryProps {
  controller: HeadlessQuerySummary;
}

const QuerySummaryRenderer: FunctionComponent<QuerySummaryProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const renderNoResults = () => {
    return <StyledBox mt={5}>No results</StyledBox>;
  };

  const renderBold = (input: string) => {
    return (
      <Box component="span">
        <strong>{input}</strong>
      </Box>
    );
  };

  const renderRange = () => {
    return renderBold(` ${state.firstResult}-${state.lastResult}`);
  };

  const renderTotal = () => {
    return <Box component="span"> of {renderBold(state.total.toString())}</Box>;
  };

  const renderQuery = () => {
    if (state.hasQuery) {
      return <Box component="span"> for {renderBold(state.query)}</Box>;
    }
  };

  const renderDuration = () => {
    return ` in ${state.durationInSeconds} seconds`;
  };

  const renderHasResults = () => {
    return (
      <StyledBox>
        <Box fontWeight="fontWeightBold">
          Results{renderRange()}
          {renderTotal()}
          {renderQuery()}
          {renderDuration()}
        </Box>
      </StyledBox>
    );
  };

  return !state.hasResults && state.firstSearchExecuted ? renderNoResults() : renderHasResults();
};

const QuerySummary = () => {
  const engine = useContext(EngineContext)!;
  const controller = buildQuerySummary(engine);
  return <QuerySummaryRenderer controller={controller} />;
};

export default QuerySummary;

const StyledBox = styled(Box)`
  color:${Theme.secondaryText};
`;