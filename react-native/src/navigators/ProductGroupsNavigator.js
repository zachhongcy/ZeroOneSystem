import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import ProductGroupsScreen from '../screens/ProductGroups/ProductGroupsScreen';
import CreateUpdateProductGroupScreen from '../screens/CreateUpdateProductGroups/CreateUpdateProductGroupScreen';

const Stack = createNativeStackNavigator();

export default function ProductGroupsStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="ProductGroups">
      <Stack.Screen
        name="ProductGroups"
        component={ProductGroupsScreen}
        options={({ navigation }) => ({
          title: t('::ProductGroups'),
          headerLeft: () => <HamburgerIcon navigation={navigation} marginLeft={-3} />,
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateProductGroup')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateProductGroup"
        component={CreateUpdateProductGroupScreen}
        options={({ route }) => ({
          title: t(route.params?.productGroupId ? '::ProductGroup:Edit' : '::ProductGroup:Create'),
        })}
      />
    </Stack.Navigator>
  );
}
