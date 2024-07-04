import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box, Pagination } from '@mui/material';
import ResponsiveAppBar from './AppBar';
import { useLoaderData, useNavigate } from 'react-router-dom';

const NewsDashboard = () => {
  const navigate = useNavigate();
  const { state, page, articles } = useLoaderData();
  return (
    <>
    <ResponsiveAppBar state={state} ></ResponsiveAppBar>
    <Container maxWidth='false' height="100%" sx={{width: '100%', margin: '0', padding: '0px',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'}}>
    <Typography variant='h4' textAlign="center" fontWeight={"bold"} sx={{ml: 1,
              mr: 2,
              mt: 1,
              width: '100%',
              borderBottom: '1px solid #000000',
              fontSize: 39,
              fontFamily: 'lexend',
        }}>Recommended Articles </Typography>
      <Grid container m={0} spacing={2}>
        {articles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ width: '90%', height: '230px', border: "1px solid #CFD3D8", boxShadow: "1px 5px 10px rgb(100, 100, 100, .2)"}}>
              <CardActionArea href={article.url} target="_blank" rel="noopener noreferrer">
                <CardContent>
                  <Typography gutterBottom fontSize={'25px'} fontWeight={'bold'} component="div">
                    {article.title}
                  </Typography>
                  <Box height='100px' sx={{ overflow: 'hidden' }}>
                    <Typography fontSize={'18px'} marginBottom={'20px'} variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {article.text}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    <Pagination page={parseInt(page)} onChange={(event,value)=> {console.log(value);navigate(`../${value}`, { relative: "path" })}} count={10} shape="rounded" />
    </Container>
    </>
  );
};

export default NewsDashboard;
