import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { INSURANCE_CATEGORIES } from '../data/categories';

export default function CategoryLandingPage() {
  const navigate = useNavigate();

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Explore insurance policies</Typography>
        <Typography variant="body1" color="text.secondary">
          Select an insurance type to view available policies and compare up to four side-by-side.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {INSURANCE_CATEGORIES.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.slug}>
            <Card
              onClick={() => navigate(`/category/${category.slug}`)}
              sx={{
                cursor: 'pointer',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: category.color,
                color: category.textColor,
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 },
                transition: 'transform 0.18s ease-in-out',
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Typography variant="h2" component="span">
                    {category.emoji}
                  </Typography>
                  <Typography variant="h6">{category.label}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  {category.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{ m: 2, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.95)', color: category.color }}
              >
                View policies
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
