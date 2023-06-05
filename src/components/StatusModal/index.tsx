import * as React from 'react';

import {Modal, Button, Portal, Text} from 'react-native-paper';

import styles from './styles';

interface StatusModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  message: string;
}

const StatusModal = ({isVisible, onDismiss, message}: StatusModalProps) => {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.contentContainer}>
        <Text>{message}</Text>

        <Button
          icon="plus"
          mode="contained"
          onPress={() => {
            onDismiss();
          }}>
          Ok
        </Button>
      </Modal>
    </Portal>
  );
};

export default StatusModal;
