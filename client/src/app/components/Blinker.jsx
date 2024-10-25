import * as React from 'react';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Blinker = styled('div')({
  backgroundColor: 'red',
  width: 10,
  height: 10,
  borderRadius: "50%",
  animation: `${blink} 1s linear infinite`,
});

export default function BasicUsage() {
  return <Blinker />;
}
