import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  IconButton, 
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Produto 1',
      price: 99.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Produto 2',
      price: 149.99,
      quantity: 2,
      image: 'https://via.placeholder.com/150'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [checkoutDialog, setCheckoutDialog] = useState(false);

  const handleUpdateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - (subtotal * discount);
  };

  const handleApplyCoupon = () => {
    // Simulated coupon codes
    const coupons = {
      'DESCONTO10': 0.1,
      'DESCONTO20': 0.2,
      'PROMO50': 0.5
    };

    if (coupons[couponCode]) {
      setDiscount(coupons[couponCode]);
      setSnackbar({
        open: true,
        message: 'Cupom aplicado com sucesso!',
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Cupom inválido',
        severity: 'error'
      });
    }
  };

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      setCartItems([]);
      setDiscount(0);
      setCouponCode('');
      setCheckoutDialog(false);
      setSnackbar({
        open: true,
        message: 'Compra realizada com sucesso!',
        severity: 'success'
      });
    }, 1500);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {cartItems.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Seu carrinho está vazio
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/')}
                >
                  Voltar às Compras
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <List>
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`R$ ${item.price.toFixed(2)}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        <IconButton onClick={() => handleUpdateQuantity(item.id, -1)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => handleUpdateQuantity(item.id, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    size="small"
                    label="Cupom de desconto"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    sx={{ mr: 2 }}
                  />
                  <Button variant="outlined" onClick={handleApplyCoupon}>
                    Aplicar Cupom
                  </Button>
                </Box>
                <Typography variant="body1" align="right">
                  Subtotal: R$ {calculateSubtotal().toFixed(2)}
                </Typography>
                {discount > 0 && (
                  <Typography variant="body1" align="right" color="success.main">
                    Desconto: {(discount * 100)}%
                  </Typography>
                )}
                <Typography variant="h6" align="right">
                  Total: R$ {calculateTotal().toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        {cartItems.length > 0 && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate('/')}
              >
                Continuar Comprando
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setCheckoutDialog(true)}
              >
                Finalizar Compra
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={checkoutDialog} onClose={() => setCheckoutDialog(false)}>
        <DialogTitle>Confirmar Compra</DialogTitle>
        <DialogContent>
          <Typography>
            Total a pagar: R$ {calculateTotal().toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialog(false)}>Cancelar</Button>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Cart;