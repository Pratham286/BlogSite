import { Box, Container, Divider, Paper, Typography } from "@mui/material";

function Blog(props) {
  return (
    <Box  onClick={props.onClick} sx={{ width: "100%", maxWidth: 400, flex: "1 1 300px", m: 1 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            {props.title}
          </Typography>
          <Divider />
        </Box>

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            Author: {props.author}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" color="text.secondary">
            Likes: {props.likes}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Blog;
 