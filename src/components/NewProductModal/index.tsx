import * as React from 'react';
import {useState} from 'react';

import {Modal, Button, Portal, Text, TextInput} from 'react-native-paper';

import styles from './styles';

interface NewProductModalProps {
  isVisible: boolean;
  callback: (newProduct: string) => void;
  onDismiss: () => void;
}

const NewProductModal = ({
  callback,
  isVisible,
  onDismiss,
}: NewProductModalProps) => {
  const [newProductName, setNewProductName] = useState('');

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.contentContainer}>
        <Text>Enter a new product</Text>
        <TextInput
          label="New product name"
          value={newProductName}
          onChangeText={newText => {
            setNewProductName(newText);
          }}
        />
        <Button
          icon="plus"
          mode="contained"
          onPress={() => {
            callback(newProductName);
            setNewProductName('');
          }}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
};

export default NewProductModal;
