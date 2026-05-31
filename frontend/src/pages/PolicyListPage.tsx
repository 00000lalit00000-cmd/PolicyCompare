import { useEffect, useMemo, useState } from 'react';
import { Policy } from '../types/policy';
import { fetchPolicies } from '../services/api';
import PolicyCard from '../components/PolicyCard';
import CompareTray from '../components/CompareTray';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

interface PolicyListPageProps {
  selected: Policy[];
  onToggle: (policy: Policy) => void;
  onCompare: () => void;
  onClear: () => void;
  category?: string;
  categoryLabel?: string;
}

export default function PolicyListPage({ selected, onToggle, onCompare, onClear, category, categoryLabel }: PolicyListPageProps) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPolicies(query, category)
      .then((data) => {
        setPolicies(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, category]);

  const selectedIds = useMemo(() => selected.map((policy) => policy.id), [selected]);
  const title = categoryLabel ? `${categoryLabel} policies` : 'Policy catalog';

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack>
          <Typography variant="h4">{title}</Typography>
          {categoryLabel && (
            <Typography variant="body2" color="text.secondary">
              Browse all {categoryLabel.toLowerCase()} plans available for comparison.
            </Typography>
          )}
        </Stack>
        <TextField
          label="Search policies"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          size="small"
        />
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}
      {selected.length >= 4 && (
        <Alert severity="warning">You have reached the maximum of 4 policies for comparison.</Alert>
      )}
      {loading ? (
        <CircularProgress />
      ) : policies.length === 0 ? (
        <Alert severity="info">No policies found for this category or search term.</Alert>
      ) : (
        <Grid container spacing={3}>
          {policies.map((policy) => (
            <Grid item xs={12} md={6} lg={4} key={policy.id}>
              <PolicyCard
                policy={policy}
                selected={selectedIds.includes(policy.id)}
                disabled={!selectedIds.includes(policy.id) && selected.length >= 4}
                onToggle={() => onToggle(policy)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <CompareTray selected={selected} onClear={onClear} onCompare={onCompare} />
    </Stack>
  );
}
