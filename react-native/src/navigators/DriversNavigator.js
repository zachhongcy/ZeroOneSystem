import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import CreateUpdateDriverScreen from '../screens/CreateUpdateDrivers/CreateUpdateDriverScreen';
import DriversScreen from '../screens/Drivers/DriversScreen';

const Stack = createNativeStackNavigator();

export default function DriversStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Drivers">
      <Stack.Screen
        name="Drivers"
        component={DriversScreen}
        options={({ navigation }) => ({
          title: t('::Drivers'),
          headerLeft: () => <HamburgerIcon navigation={navigation} marginLeft={-3} />,
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateDriver')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateDriver"
        component={CreateUpdateDriverScreen}
        options={({ route }) => ({
          title: t(route.params?.driverId ? '::Edit' : '::Create'),
        })}
      />
    </Stack.Navigator>
  );
}
