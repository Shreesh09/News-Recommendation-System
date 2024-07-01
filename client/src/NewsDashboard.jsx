import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import ResponsiveAppBar from './AppBar';

const NewsDashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://news-recommendation.azurewebsites.net/getNewsRecommendation?page=1', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxOTc0OTEyMSwianRpIjoiM2FjOThiM2UtMDgwMy00ODQyLWE5Y2EtZTNhNTdiZjRhYTMzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QzIiwibmJmIjoxNzE5NzQ5MTIxLCJjc3JmIjoiYzdmYzY2NTktYWFkOC00MjBkLWExMGYtZWY4MGE5OGI2Y2I2IiwiZXhwIjoxNzE5ODM1NTIxfQ.qMY1ZFc5IB8dLijuM3KCawkdxW8UhEA25sGOfzOUZq4',
          }
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching the news:', error);
      }
    };

    fetchNews();
  }, []);


  return (
    <Container type="main" maxWidth='false' sx={{width: '100vw'}}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography variant="h2" component="h1" gutterBottom>
        News Dashboard
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ height: '400px'}}>
              <CardActionArea href={article.url} target="_blank" rel="noopener noreferrer">
                <CardMedia
                  component="img"
                  height="140"
                  image={article.link || 'https://via.placeholder.com/150'}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography marginBottom={'20px'} variant="body2" color="text.secondary">
                    {article.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsDashboard;
