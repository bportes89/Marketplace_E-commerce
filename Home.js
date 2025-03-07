import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Tabs,
  Tab,
  InputAdornment,
  TextField,
  Chip,
  Stack,
  Fade,
  Rating,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Drawer,
  Badge,
  CircularProgress,
  Tooltip,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from '../components/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const banners = [
  {
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    title: 'Ofertas Especiais',
    subtitle: 'Até 40% de desconto em produtos selecionados'
  },
  {
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    title: 'Novos Produtos',
    subtitle: 'Confira os últimos lançamentos'
  },
  {
    image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg',
    title: 'Tecnologia Premium',
    subtitle: 'As melhores marcas em um só lugar'
  }
];

const categories = ['Todos', 'Smartphones', 'Notebooks', 'Acessórios', 'Câmeras', 'TVs', 'Games', 'Áudio'];
const sortOptions = ['Mais Relevantes', 'Menor Preço', 'Maior Preço', 'Mais Vendidos'];

const products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 1299.99,
    category: 'Smartphones',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Smartphone última geração com câmera de alta resolução',
    rating: 4.5,
    reviews: 128,
    freeShipping: true,
    isNew: true,
    discount: 10
  },
  {
    id: 2,
    name: 'Notebook Pro',
    price: 4499.99,
    category: 'Notebooks',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Notebook profissional com processador de última geração',
    rating: 4.8,
    reviews: 89,
    freeShipping: true,
    isNew: true,
    discount: 15
  },
  {
    id: 3,
    name: 'Smartwatch Sport',
    price: 899.99,
    category: 'Acessórios',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Relógio inteligente para atividades físicas',
    rating: 4.3,
    reviews: 256,
    freeShipping: false,
    isNew: false,
    discount: 20
  },
  {
    id: 4,
    name: 'Fone Bluetooth Pro',
    price: 299.99,
    category: 'Áudio',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fone sem fio com cancelamento de ruído ativo',
    rating: 4.6,
    reviews: 312,
    freeShipping: true,
    isNew: false,
    discount: 5
  },
  {
    id: 5,
    name: 'Câmera DSLR 4K',
    price: 3299.99,
    category: 'Câmeras',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Câmera profissional para fotografia e vídeo',
    rating: 4.7,
    reviews: 89,
    freeShipping: true,
    isNew: true,
    discount: 8
  },
  {
    id: 6,
    name: 'Console GameMax',
    price: 4999.99,
    category: 'Games',
    image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Console de última geração com gráficos realistas',
    rating: 4.9,
    reviews: 445,
    freeShipping: true,
    isNew: true,
    discount: 12
  },
  {
    id: 7,
    name: 'Tablet Ultra HD',
    price: 2499.99,
    category: 'Tablets',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tablet com tela de alta resolução e processador potente',
    rating: 4.4,
    reviews: 167,
    freeShipping: true,
    isNew: false,
    discount: 15
  },
  {
    id: 8,
    name: 'Smart TV 4K 65"',
    price: 3799.99,
    category: 'TVs',
    image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'TV inteligente com resolução 4K e HDR',
    rating: 4.8,
    reviews: 234,
    freeShipping: true,
    isNew: true,
    discount: 10
  },
  {
    id: 9,
    name: 'Caixa de Som Bluetooth',
    price: 199.99,
    category: 'Áudio',
    image: 'https://images.pexels.com/photos/157557/pexels-photo-157557.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Caixa de som portátil com bateria de longa duração',
    rating: 4.2,
    reviews: 178,
    freeShipping: false,
    isNew: false,
    discount: 25
  },
  {
    id: 10,
    name: 'Mouse Gamer RGB',
    price: 299.99,
    category: 'Acessórios',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mouse com sensor de alta precisão e iluminação RGB',
    rating: 4.6,
    reviews: 412,
    freeShipping: true,
    isNew: false,
    discount: 18
  },
  {
    id: 11,
    name: 'Teclado Mecânico',
    price: 449.99,
    category: 'Acessórios',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Teclado mecânico com switches premium',
    rating: 4.7,
    reviews: 156,
    freeShipping: true,
    isNew: true,
    discount: 15
  },
  {
    id: 12,
    name: 'Webcam Full HD',
    price: 299.99,
    category: 'Câmeras',
    image: 'https://images.pexels.com/photos/3816747/pexels-photo-3816747.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Webcam com resolução Full HD e microfone integrado',
    rating: 4.3,
    reviews: 89,
    freeShipping: false,
    isNew: false,
    discount: 20
  }
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('Mais Relevantes');
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    freeShipping: false,
    newProducts: false,
    onSale: false
  });

  const itemsPerPage = 8;

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= ratingFilter;
      const matchesFreeShipping = !selectedFilters.freeShipping || product.freeShipping;
      const matchesNew = !selectedFilters.newProducts || product.isNew;
      const matchesOnSale = !selectedFilters.onSale || product.discount > 0;

      return matchesCategory && matchesSearch && matchesPrice && 
             matchesRating && matchesFreeShipping && matchesNew && matchesOnSale;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'Menor Preço':
        return a.price - b.price;
      case 'Maior Preço':
        return b.price - a.price;
      case 'Mais Vendidos':
        return b.reviews - a.reviews;
      default: // Mais Relevantes
        return b.rating - a.rating;
    }
  });

  const currentProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, priceRange, ratingFilter, selectedFilters]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (filterName) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const BannerSection = () => (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={6000}
      showDots={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {banners.map((banner, i) => (
        <Box
          key={i}
          sx={{
            height: { xs: 200, sm: 300, md: 400 },
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            px: 2
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {banner.title}
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {banner.subtitle}
          </Typography>
        </Box>
      ))}
    </Carousel>
  );

  const FilterSection = () => (
    <Card sx={{ p: 2, mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Filtros</Typography>
          {isMobile && (
            <IconButton onClick={() => setShowFilters(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography gutterBottom>Faixa de Preço</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          sx={{ mt: 2, mb: 4 }}
        />

        <Typography gutterBottom>Avaliação Mínima</Typography>
        <Rating
          value={ratingFilter}
          onChange={(event, newValue) => setRatingFilter(newValue)}
          precision={0.5}
          sx={{ mb: 3 }}
        />

        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          <Chip 
            icon={<LocalShippingIcon />}
            label="Frete Grátis"
            clickable
            color={selectedFilters.freeShipping ? "primary" : "default"}
            onClick={() => handleFilterChange('freeShipping')}
            variant={selectedFilters.freeShipping ? "filled" : "outlined"}
          />
          <Chip 
            icon={<NewReleasesIcon />}
            label="Lançamentos"
            clickable
            color={selectedFilters.newProducts ? "secondary" : "default"}
            onClick={() => handleFilterChange('newProducts')}
            variant={selectedFilters.newProducts ? "filled" : "outlined"}
          />
          <Chip 
            icon={<LocalOfferIcon />}
            label="Ofertas"
            clickable
            color={selectedFilters.onSale ? "success" : "default"}
            onClick={() => handleFilterChange('onSale')}
            variant={selectedFilters.onSale ? "filled" : "outlined"}
          />
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <BannerSection />
      
      <Container>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h6" color="text.secondary">
              {filteredProducts.length} produtos encontrados
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="small"
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filtros
                </Button>
              )}
            </Box>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 3,
              bgcolor: 'white',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category}
                sx={{ 
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {(!isMobile || showFilters) && (
            <Grid item xs={12} md={3}>
              <FilterSection />
            </Grid>
          )}

          <Grid item xs={12} md={!isMobile || showFilters ? 9 : 12}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                      <Fade in timeout={500}>
                        <div>
                          <ProductCard product={product} />
                        </div>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                {sortedProducts.length > itemsPerPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                    <Pagination
                      count={Math.ceil(sortedProducts.length / itemsPerPage)}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    />
                  </Box>
                )}

                {sortedProducts.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      Nenhum produto encontrado
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      <Drawer
        anchor="right"
        open={isMobile && showFilters}
        onClose={() => setShowFilters(false)}
      >
        <Box sx={{ width: 280 }}>
          <FilterSection />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Home;