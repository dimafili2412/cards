import React from 'react';
import { StyledTable } from './Table.styled';

const Table = ({ headers = [], rows = [], cellRender }) => (
  <StyledTable>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {headers.map((header) => (
            <td data-label={header.title} key={header.key}>
              {cellRender ? cellRender(row[header.key], rowIndex, header.key, row) : row[header.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

export default Table;
