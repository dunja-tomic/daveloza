import * as React from 'react';
import {useState} from 'react';
import {Card, Text, TextInput} from 'react-native-paper';

import styles from './styles';

interface ItemCardProps {
  title: string;
  // callback function to set the value in the parent
  updateFunction: (newValue: string, product: string) => void;
}

const ItemCard = ({title, updateFunction}: ItemCardProps) => {
  const [value, setValue] = useState('');

  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text variant="bodyLarge">{title}</Text>
        <TextInput
          value={value}
          label="Quantite"
          style={styles.textInput}
          onChangeText={newText => {
            setValue(newText);
            updateFunction(newText, title);
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default ItemCard;
