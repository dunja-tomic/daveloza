import * as React from 'react';
import {DataTable} from 'react-native-paper';

interface LeftoversListProps {
  products: string[];
  leftovers: string[];
}

const LeftoversList = ({products, leftovers}: LeftoversListProps) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Product</DataTable.Title>
        <DataTable.Title>Quantity</DataTable.Title>
      </DataTable.Header>

      {products.map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{item}</DataTable.Cell>
          <DataTable.Cell>{leftovers[index] ?? '0'}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default LeftoversList;
