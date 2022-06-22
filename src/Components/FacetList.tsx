import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Facet from './Facet';

const FacetList = () => {
  return (
    <Box>
      <Box px={1} pb={1} mt={4}>
{/*         <Typography variant="overline">Refined By</Typography> */}
        <Facet field="source" title="Source" />
        <Facet field="filetype" title="File Type" />
        <Facet field="concepts" title="Concepts" />
      </Box>
    </Box>
  );
};

export default FacetList;
