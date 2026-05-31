import { Policy } from '../types/policy';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

interface PolicyCardProps {
  policy: Policy;
  selected: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export default function PolicyCard({ policy, selected, disabled, onToggle }: PolicyCardProps) {
  return (
    <Card variant="outlined" sx={{ minHeight: 220, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">{policy.title}</Typography>
          <Checkbox checked={selected} disabled={disabled} onChange={onToggle} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {policy.description ?? 'No description'}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
          {(policy.tags ?? []).slice(0, 3).map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {policy.issuer ?? 'Unknown issuer'}
        </Typography>
        <Button size="small" onClick={onToggle} disabled={disabled}>
          {selected ? 'Deselect' : 'Select'}
        </Button>
      </CardActions>
    </Card>
  );
}
