import React from "react";
import styled from "styled-components";

const Tr = styled.tr`
  border-bottom: 1px solid #d5d5d5;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const Thead = styled.thead`
  th {
    padding-bottom: 0.5rem;
  }
`;

const Th = styled.th``;

const Table = ({ data }) => {
  const [thead, ...tbody] = data;

  return (
    <StyledTable>
      <Thead>
        <Tr>
          {thead.map((value) => {
            return <Th key={`th-${value}`}>{value}</Th>;
          })}
        </Tr>
      </Thead>
      <tbody>
        {tbody.map((row, i) => {
          return (
            <Tr key={`tr-${i}`}>
              {row.map((d) => {
                return <td key={`d-${d}`}>{d}</td>;
              })}
            </Tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Table;
