import { Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import DataList from '../../components/DataList/DataList';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { getProductGroups } from '../../api/ProductGroupAPI';

function ProductGroupsScreen({ navigation }) {
  const { t } = React.useContext(LocalizationContext);

  return (
      <DataList
        navigation={navigation}
        fetchFn={getProductGroups}
        render={({item}) => (
          <Pressable
          onPress={() => navigateToCreateUpdateProductGroupScreen(navigation, item)}
        >
          <Box
            borderBottomWidth="1"
            borderColor="coolGray.200"
            pl="2"
            pr="5"
            py="2"
          >
            <HStack space={1}>
              <Text color="coolGray.500">{t('::ProductGroup:Name')}:</Text>
              <Text color="coolGray.800" bold>
                {item.name}
              </Text>
            </HStack>
            <HStack space={1}>
              <Text color="coolGray.500">{t('::ProductGroup:ShortCode')}:</Text>
              <Text color="coolGray.800" bold>
                {item.shortCode}
              </Text>
            </HStack>
            <HStack space={1}>
              <Text color="coolGray.500">{t('::ProductGroup:Description')}:</Text>
              <Text color="coolGray.800" bold>
                {item.description}
              </Text>
            </HStack>
          </Box>
        </Pressable>
        )}
      />
  );
}

const navigateToCreateUpdateProductGroupScreen = (navigation, productGroup = {}) => {
  navigation.navigate('CreateUpdateProductGroup', {
    productGroupId: productGroup.id,
  });
};

export default ProductGroupsScreen;
