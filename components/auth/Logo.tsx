
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Logo() {
  return (
    <Box sx={{ width: 150, height: 150, position: 'relative' }}>
      <Image
        src="/axiom-logo.png"
        alt="Axiom Gaming"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
}
