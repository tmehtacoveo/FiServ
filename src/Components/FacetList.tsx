import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Facet from './Facet';

const FacetList = () => {
  return (
    <Box>
      <Box px={1} pb={1}>
        <Typography variant="overline">Refine By</Typography>
        <Facet field="source" title="Source" />
        <Facet field="filetype" title="File Type" />
        <Facet field="concepts" title="Concepts" />
      </Box>
    </Box>
  );
};

export default FacetList;
