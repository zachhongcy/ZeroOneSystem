import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddIcon from '../components/AddIcon/AddIcon';
import HamburgerIcon from '../components/HamburgerIcon/HamburgerIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import CreateUpdateTripScreen from '../screens/CreateUpdateTrips/CreateUpdateTripScreen';
import TripsScreen from '../screens/Trips/TripsScreen';

const Stack = createNativeStackNavigator();

export default function TripsStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Trips">
      <Stack.Screen
        name="Trips"
        component={TripsScreen}
        options={({ navigation }) => ({
          title: t('::Trips'),
          headerLeft: () => <HamburgerIcon navigation={navigation} marginLeft={-3} />,
          headerRight: () => <AddIcon onPress={() => navigation.navigate('CreateUpdateTrip')}/>,
        })}
      />
      <Stack.Screen
        name="CreateUpdateTrip"
        component={CreateUpdateTripScreen}
        options={({ route }) => ({
          title: t(route.params?.tripId ? '::Edit' : '::Create'),
        })}
      />
    </Stack.Navigator>
  );
}
