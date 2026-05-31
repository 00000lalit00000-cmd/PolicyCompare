import { Policy } from '../types/policy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

interface PolicyComparePageProps {
  selected: Policy[];
  onClear: () => void;
}

const areEqual = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);

export default function PolicyComparePage({ selected, onClear }: PolicyComparePageProps) {
  if (selected.length < 2) {
    return <Alert severity="info">Please select at least 2 policies to compare.</Alert>;
  }

  const common = {
    issuer: selected.every((policy) => areEqual(policy.issuer, selected[0].issuer)),
    effective_date: selected.every((policy) => areEqual(policy.effective_date, selected[0].effective_date)),
    last_updated: selected.every((policy) => areEqual(policy.last_updated, selected[0].last_updated)),
    tags: selected.every((policy) => areEqual(policy.tags, selected[0].tags)),
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography variant="h4">Compare policies</Typography>
          <Typography variant="body2" color="text.secondary">
            Compare up to 4 selected policies side-by-side and spot key differences.
          </Typography>
        </Stack>
        <Button variant="outlined" onClick={onClear}>Clear selection</Button>
      </Stack>

      <Grid container spacing={2}>
        {selected.map((policy) => (
          <Grid item xs={12} md={6} xl={3} key={policy.id}>
            <Card variant="outlined" sx={{ minHeight: 380, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>{policy.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {policy.description ?? 'No description available.'}
                </Typography>
                <Box sx={{ mt: 2, mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Core details</Typography>
                  <Typography sx={{ bgcolor: common.issuer ? 'transparent' : 'rgba(255,235,59,0.2)', p: 1, borderRadius: 1 }}>
                    <strong>Issuer:</strong> {policy.issuer ?? '–'}
                  </Typography>
                  <Typography sx={{ bgcolor: common.effective_date ? 'transparent' : 'rgba(255,235,59,0.2)', p: 1, borderRadius: 1 }}>
                    <strong>Effective:</strong> {policy.effective_date ?? '–'}
                  </Typography>
                  <Typography sx={{ bgcolor: common.last_updated ? 'transparent' : 'rgba(255,235,59,0.2)', p: 1, borderRadius: 1 }}>
                    <strong>Updated:</strong> {policy.last_updated ?? '–'}
                  </Typography>
                </Box>
                <Typography variant="subtitle2">Tags</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  {(policy.tags ?? []).map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Stack>
                <Typography variant="subtitle2" gutterBottom>Sections</Typography>
                {(policy.sections ?? []).map((section) => (
                  <Box key={section.title} sx={{ mb: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight={700}>{section.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{section.content}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Alert severity="info">
        Differences are highlighted in yellow when items do not match across selected policies.
      </Alert>
    </Stack>
  );
}
