import { Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import DataList from '../../components/DataList/DataList';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { getDrivers } from '../../api/DriverAPI';

function DriversScreen({ navigation }) {
    const { t } = React.useContext(LocalizationContext);
  
    return (
        <DataList
          navigation={navigation}
          fetchFn={getDrivers}
          render={({item}) => (
            <Pressable
            onPress={() => navigateToCreateUpdateDriverScreen(navigation, item)}
          >
            <Box
              borderBottomWidth="1"
              borderColor="coolGray.200"
              pl="2"
              pr="5"
              py="2"
            >
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Driver:Name')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.driverName}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Driver:LicenseNo')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.licenseNo}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Driver:LicenseExpiryDate')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.licenseExpiryDate}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Driver:ContactNo')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.contactNo}
                </Text>
              </HStack>
            </Box>
          </Pressable>
          )}
        />
    );
  }
  
  const navigateToCreateUpdateDriverScreen = (navigation, driver = {}) => {
    navigation.navigate('CreateUpdateDriver', {
      driverId: driver.id,
    });
  };
  
  export default DriversScreen;