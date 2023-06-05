import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

import API from '../../../modules/api';
import LeftoversList from '../../../components/LeftoversList';

import styles from './styles';

const Leftovers = () => {
  // Data
  const [products, setProducts] = useState(['']);
  const [leftovers, setLeftovers] = useState([['']]);

  // Spinners
  const [doneFetching, setDoneFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setDoneFetching(false);

    const data = await API.getAllData();
    console.log(data);
    if ('values' in data) {
      const productsRaw: string[] = data.values[0].slice(1);
      const leftoversRaw: string[][] = data.values.slice(1);
      setProducts(productsRaw);
      setLeftovers(leftoversRaw);
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

  const renderLoadingScreen = () => {
    return <ActivityIndicator size="large" />;
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Appbar.Header>
          <Appbar.Content title="Leftovers" />
        </Appbar.Header>

        {!doneFetching ? (
          renderLoadingScreen()
        ) : (
          <View style={styles.viewContainer}>
            {leftovers
              .reverse()
              // .slice(0, 10) // only take the last 10 values
              .map(leftover => {
                return (
                  <View style={styles.leftoversView} key={leftover[0]}>
                    <Text variant="bodyLarge">{leftover[0]}</Text>
                    <LeftoversList
                      leftovers={leftover.slice(1)}
                      products={products}
                    />
                  </View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leftovers;
