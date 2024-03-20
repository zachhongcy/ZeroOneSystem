import { Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import DataList from '../../components/DataList/DataList';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { getTrips } from '../../api/TripAPI';

function TripsScreen({ navigation }) {
    const { t } = React.useContext(LocalizationContext);
  
    return (
        <DataList
          navigation={navigation}
          fetchFn={getTrips}
          render={({item}) => (
            <Pressable
            onPress={() => navigateToCreateUpdateTripScreen(navigation, item)}
          >
            <Box
              borderBottomWidth="1"
              borderColor="coolGray.200"
              pl="2"
              pr="5"
              py="2"
            >
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Trip:Number')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.tripNo}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Trip:Date')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.tripDate}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Trip:Type')}:</Text>
                <Text color="coolGray.800" bold>
                  {TripTypes[item.tripType]}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Trip:CustomerName')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.customerName}
                </Text>
              </HStack>
            </Box>
          </Pressable>
          )}
        />
    );
  }

  const TripTypes = ['Delivery', 'Collection'];
  
  const navigateToCreateUpdateTripScreen = (navigation, trip = {}) => {
    navigation.navigate('CreateUpdateTrip', {
      tripId: trip.id,
    });
  };
  
  export default TripsScreen;