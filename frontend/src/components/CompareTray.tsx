import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Policy } from '../types/policy';

interface CompareTrayProps {
  selected: Policy[];
  onClear: () => void;
  onCompare: () => void;
}

export default function CompareTray({ selected, onClear, onCompare }: CompareTrayProps) {
  if (!selected.length) return null;

  return (
    <Paper sx={{ p: 2, mt: 3, borderRadius: 2 }} elevation={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
        <Stack>
          <Typography variant="subtitle1">Compare selected policies</Typography>
          <Typography variant="body2" color="text.secondary">
            {selected.length}/4 selected. Select up to 4 policies to compare side-by-side.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="inherit" onClick={onClear}>
            Clear selection
          </Button>
          <Button variant="contained" onClick={onCompare} disabled={selected.length < 2}>
            Compare now
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
