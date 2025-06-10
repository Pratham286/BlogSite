import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { Person, Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.8)',
  border: '1px solid rgba(75, 85, 99, 0.5)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.4)',
  },
}));

const StyledDivider = styled(Divider)({
  backgroundColor: 'rgba(75, 85, 99, 0.5)',
  margin: '0.75rem 0',
});

const TitleTypography = styled(Typography)({
  color: '#f9fafb',
  fontWeight: 600,
  marginBottom: '0.75rem',
});

const SubtitleTypography = styled(Typography)({
  color: '#d1d5db',
  fontSize: '1rem',
});

const MetaBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75rem',
  padding: '0.25rem 0',
  gap: '0.5rem',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  color: '#ffffff',
  fontSize: '16px',
});

function Blog(props) {
  return (
    <Box 
      onClick={props.onClick} 
      sx={{ 
        width: "100%", 
        maxWidth: 400, 
        flex: "1 1 300px", 
        margin: 1 
      }}
    >
      <StyledPaper elevation={0}>
        <Box textAlign="center" mb={2}>
          <TitleTypography variant="h5" component="h2">
            {props.title}
          </TitleTypography>
          <StyledDivider />
        </Box>

        <MetaBox>
          <IconWrapper>
            <Person fontSize="small" />
          </IconWrapper>
          <SubtitleTypography variant="subtitle1">
            {props.author}
          </SubtitleTypography>
        </MetaBox>
        
        <MetaBox>
          <IconWrapper>
            <Favorite fontSize="small" />
          </IconWrapper>
          <SubtitleTypography variant="subtitle1">
            {props.likes || 0}
          </SubtitleTypography>
        </MetaBox>
      </StyledPaper>
    </Box>
  );
}

export default Blog;