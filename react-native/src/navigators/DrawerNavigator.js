import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import HomeStackNavigator from './HomeNavigator';
import SettingsStackNavigator from './SettingsNavigator';
import TenantsStackNavigator from './TenantsNavigator';
import UsersStackNavigator from './UsersNavigator';
import ProductGroupsStackNavigator from './ProductGroupsNavigator';
import DriversStackNavigator from './DriversNavigator';
import TripsStackNavigator from './TripsNavigator';
import VehiclesStackNavigator from './VehiclesNavigator';
import ProductsStackNavigator from './ProductsNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          title: t('::Menu:Home'),
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ProductGroupsStack"
        component={ProductGroupsStackNavigator}
        options={{ header: () => null }}
      />
      <Drawer.Screen
        name="ProductsStack"
        component={ProductsStackNavigator}
        options={{ header: () => null }}
      />
      <Drawer.Screen
        name="TripsStack"
        component={TripsStackNavigator}
        options={{ header: () => null }}
      />
      <Drawer.Screen
        name="DriversStack"
        component={DriversStackNavigator}
        options={{ header: () => null }}
      />
      <Drawer.Screen
        name="VehiclesStack"
        component={VehiclesStackNavigator}
        options={{ header: () => null }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{ header: () => null }}
      />
    </Drawer.Navigator>
  );
}
