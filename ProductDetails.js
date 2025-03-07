import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';

function ProductDetails() {
  const { id } = useParams();

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Nome do Produto
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            R$ 99,99
          </Typography>
          <Typography variant="body1" paragraph>
            Descrição detalhada do produto...
          </Typography>
          <Box mt={3}>
            <Button variant="contained" color="primary" size="large">
              Adicionar ao Carrinho
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;