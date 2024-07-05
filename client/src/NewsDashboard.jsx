import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box, Pagination } from '@mui/material';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { SERVER_URL } from './keys';
import axios from 'axios';

const addNewsRead = async (news_id) => {
  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    const username = sessionStorage.getItem('username');
    axios.post(`${SERVER_URL}/addNewsRead`, { username, news_id }, { headers });
  } catch(e) {
    console.log(e);
  }
}

const NewsDashboard = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { state, page, articles, search } = useLoaderData();
  const title = state == 0 ? 'Recommended Articles' : state == 1 ? 'History' : `Search Results for "${search}"`;
  return (
    <>
    <div className={navigation.state === "loading" ? "loading" : ""}>
    <Container maxWidth='false' height="100%" sx={{width: '100%', margin: '0', padding: '0px',display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'}}>
    <Typography variant='h4' textAlign="center" fontWeight={"bold"} sx={{ml: 1,
              mr: 2,
              mt: 1,
              width: '100%',
              borderBottom: '1px solid #000000',
              fontSize: 39,
              fontFamily: 'lexend',
        }}>{title} </Typography>
      <Grid container m={0} spacing={2}>
        {(!articles || !articles.length || articles.length == 0?"No results":articles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ width: '90%', height: '230px', border: "1px solid #CFD3D8", boxShadow: "1px 5px 10px rgb(100, 100, 100, .2)"}}>
              <CardActionArea onClick={()=>addNewsRead(article.id)} href={article.link} target="_blank" rel="noopener noreferrer">
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
        )))}
      </Grid>
    <Pagination page={parseInt(page)} onChange={(event,value)=> {navigate(`../${value}`, { relative: "path" })}} count={10} shape="rounded" />
    </Container>
    </div>
    </>
  );
};

export default NewsDashboard;
