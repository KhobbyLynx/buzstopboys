// ** MUI Imports
import Card, { CardProps } from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

// ** Icon Imports
import Icon from '@/components/icon';

// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const CardEvent = () => {
    return (
        <Card>
            {/* Add your Card content here */}
        </Card>
    );
};

export default CardEvent;