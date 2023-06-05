import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {Appbar, Button, PaperProvider} from 'react-native-paper';

import API from '../../../modules/api';
import ItemCard from '../../../components/ItemCard';
import NewProductModal from '../../../components/NewProductModal';
import StatusModal from '../../../components/StatusModal';
import {formatProductsAndInventory} from '../../../modules/utils';

import styles from './styles';

interface NewValuesInterface {
  [key: string]: string;
}

const resetNewValues = (products: string[]) => {
  const newValues: NewValuesInterface = {};
  products.forEach(product => (newValues[product] = '0'));

  return newValues;
};

const Inventory = () => {
  // Data
  const [newValues, setNewValues] = useState<NewValuesInterface>({});
  const [products, setProducts] = useState<string[]>([]);
  const [numberOfColumns, setNumberOfColumns] = useState(0);

  // Modals
  const [isNewProductModalVisible, setIsNewProductModalVisible] =
    useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [statusModalMessage, setStatusModalMessage] = useState('');

  // Spinners
  const [doneFetching, setDoneFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const today = new Date();

  const fetchData = async () => {
    setDoneFetching(false);
    const data = await API.getAllData();

    // I can't figure out how to check the type here, so here's a bit of
    // a sketchy workaround
    if ('values' in data) {
      const prods: string[] = data.values[0].slice(1);
      setProducts(prods);
      setNumberOfColumns(data.values.length);
      setNewValues(resetNewValues(prods));
    } else if ('error' in data) {
      setIsStatusModalVisible(true);
      setStatusModalMessage(`Error fetching items:\n${data.error.message}`);
    }
    setDoneFetching(true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const updateValue = (newValue: string, product: string) => {
    const newObj = {...newValues, [product]: newValue};

    setNewValues(newObj);
  };

  const renderLoadingScreen = () => {
    return <ActivityIndicator size="large" />;
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Appbar.Header>
            <Appbar.Content title="Inventory" />
          </Appbar.Header>

          {!doneFetching ? (
            renderLoadingScreen()
          ) : (
            <View style={styles.container}>
              {/* Modals */}
              <NewProductModal
                isVisible={isNewProductModalVisible}
                onDismiss={() => setIsNewProductModalVisible(false)}
                callback={async (productName: string) => {
                  console.log(productName);
                  setIsNewProductModalVisible(false);
                  const apiResponse = await API.addProduct(productName);

                  // On success
                  if (apiResponse === 200) {
                    setStatusModalMessage(
                      `Successfully saved product ${productName}`,
                    );

                    // Refresh the page automatically to reflect the new data
                    fetchData();
                  }
                  // On failure
                  else {
                    setStatusModalMessage(
                      'Error saving product, please try again.',
                    );
                  }
                  setIsStatusModalVisible(true);
                }}
              />

              <StatusModal
                isVisible={isStatusModalVisible}
                onDismiss={() => {
                  setIsStatusModalVisible(false);
                  setStatusModalMessage('');
                }}
                message={statusModalMessage}
              />

              <View style={styles.productsView}>
                {products.map((item, index) => (
                  <ItemCard
                    key={index}
                    title={item}
                    updateFunction={updateValue}
                  />
                ))}
              </View>

              <View style={styles.buttonsView}>
                <Button
                  icon="plus"
                  mode="outlined"
                  style={styles.button}
                  onPress={() => setIsNewProductModalVisible(true)}>
                  Add product
                </Button>

                <Button
                  icon="content-save"
                  mode="contained"
                  style={styles.button}
                  onPress={async () => {
                    const response = await API.saveValues(
                      [
                        today.toLocaleDateString('fr-fr', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }),
                        ...(Object.values(newValues) as string[]),
                      ],
                      numberOfColumns,
                    );

                    if (response === 200) {
                      const savedItemsFormatted = formatProductsAndInventory(
                        products,
                        Object.values(newValues) as string[],
                      );
                      setStatusModalMessage(
                        `Successfully saved values:\n\n${savedItemsFormatted.join(
                          '\n',
                        )}`,
                      );
                    } else {
                      setStatusModalMessage('Error saving items');
                    }

                    setIsStatusModalVisible(true);
                    setNewValues(resetNewValues(products));
                  }}>
                  Save
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Inventory;
