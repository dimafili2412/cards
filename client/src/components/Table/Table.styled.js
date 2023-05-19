import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.8);

  th,
  td {
    text-align: left;
    padding: 16px;
    transition: background-color 0.2s;
  }

  th {
    background-color: ${({ theme }) => theme.background.accent};
    color: ${({ theme }) => theme.text.accent};
    font-size: 1.1em;
    font-weight: bold;
  }

  td {
    font-size: 1em;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.background.primary};
  }
  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.backgroundActive.primary};
  }

  @media (max-width: 768px) {
    box-shadow: none;
    th,
    td {
      display: block;
      width: auto;
    }

    tr {
      display: block;
      width: calc(100% - 20px);
      background: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
      margin: 10px;
      padding: 10px;
    }

    thead {
      display: none;
    }

    td:before {
      content: attr(data-label);
      font-weight: bold;
      display: inline-block;
      margin-bottom: 10px;
    }

    td {
      margin-bottom: 10px;
      border: 1px solid ${({ theme }) => theme.background.primary};
      border-radius: 10px;
    }
  }
`;
