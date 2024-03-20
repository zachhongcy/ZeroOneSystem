import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import CreateUpdateProductScreen from '../screens/CreateUpdateProducts/CreateUpdateProductScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';

const Stack = createNativeStackNavigator();

export default function ProductsStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
          title: t('::Products'),
          headerLeft: () => <HamburgerIcon navigation={navigation} marginLeft={-3} />,
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateProduct')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateProduct"
        component={CreateUpdateProductScreen}
        options={({ route }) => ({
          title: t(route.params?.productId ? '::Edit' : '::Create'),
        })}
      />
    </Stack.Navigator>
  );
}
