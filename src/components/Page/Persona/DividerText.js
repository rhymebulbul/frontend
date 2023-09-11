import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: '10px',
  paddingBottom: '20px',
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const content = (
    <div>
    </div>
  );

  return (
    <Root>
      <Divider>
        <Chip label="OR" />
      </Divider>
    </Root>
  );
}