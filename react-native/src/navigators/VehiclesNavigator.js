import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import CreateUpdateVehicleScreen from '../screens/CreateUpdateVehicles/CreateUpdateVehicleScreen';
import VehiclesScreen from '../screens/Vehicles/VehiclesScreen';

const Stack = createNativeStackNavigator();

export default function VehiclesStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Vehicles">
      <Stack.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={({ navigation }) => ({
          title: t('::Vehicles'),
          headerLeft: () => <HamburgerIcon navigation={navigation} marginLeft={-3} />,
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateVehicle')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateVehicle"
        component={CreateUpdateVehicleScreen}
        options={({ route }) => ({
          title: t(route.params?.vehicleId ? '::Edit' : '::Create'),
        })}
      />
    </Stack.Navigator>
  );
}
