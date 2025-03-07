import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Ver Detalhes
        </Button>
        <Button size="small" color="primary">
          Adicionar ao Carrinho
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;