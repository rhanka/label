import React, { ReactNode } from 'react';
import { TableCell as MuiTableCell } from '@material-ui/core';

export { TableCell };

function TableCell(props: { children?: ReactNode }) {
  return <MuiTableCell>{props.children}</MuiTableCell>;
}