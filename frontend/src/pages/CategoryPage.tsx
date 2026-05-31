import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PolicyListPage from './PolicyListPage';
import { InsuranceCategory, CATEGORY_BY_SLUG } from '../data/categories';
import { Policy } from '../types/policy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface CategoryPageProps {
  selected: Policy[];
  onToggle: (policy: Policy) => void;
  onCompare: () => void;
  onClear: () => void;
}

export default function CategoryPage({ selected, onToggle, onCompare, onClear }: CategoryPageProps) {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const category = useMemo<InsuranceCategory | undefined>(() => {
    if (!categorySlug) return undefined;
    return CATEGORY_BY_SLUG.get(categorySlug);
  }, [categorySlug]);

  if (!category) {
    return (
      <Box>
        <Typography variant="h4">Category not found</Typography>
        <Typography sx={{ mt: 2 }}>Please choose a valid insurance category from the homepage.</Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate('/')}>Back to categories</Button>
      </Box>
    );
  }

  return (
    <PolicyListPage
      selected={selected}
      onToggle={onToggle}
      onCompare={onCompare}
      onClear={onClear}
      category={category.label}
      categoryLabel={category.label}
    />
  );
}
