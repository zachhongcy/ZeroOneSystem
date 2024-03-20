import { Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import DataList from '../../components/DataList/DataList';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { getVehicles } from '../../api/VehicleAPI';

function VehiclesScreen({ navigation }) {
    const { t } = React.useContext(LocalizationContext);
  
    return (
        <DataList
          navigation={navigation}
          fetchFn={getVehicles}
          render={({item}) => (
            <Pressable
            onPress={() => navigateToCreateUpdateVehicleScreen(navigation, item)}
          >
            <Box
              borderBottomWidth="1"
              borderColor="coolGray.200"
              pl="2"
              pr="5"
              py="2"
            >
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Vehicle:Plate')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.vehiclePlate}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Vehicle:Type')}:</Text>
                <Text color="coolGray.800" bold>
                  {VehicleTypes[item.vehicleType]}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Vehicle:Model')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.vehicleModel}
                </Text>
              </HStack>
            </Box>
          </Pressable>
          )}
        />
    );
  }

  const VehicleTypes = ['Light', 'Medium', 'Heavy Duty'];
  
  const navigateToCreateUpdateVehicleScreen = (navigation, vehicle = {}) => {
    navigation.navigate('CreateUpdateVehicle', {
      vehicleId: vehicle.id,
    });
  };
  
  export default VehiclesScreen;