import { Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import DataList from '../../components/DataList/DataList';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { getProducts } from '../../api/ProductAPI';

function ProductsScreen({ navigation }) {
    const { t } = React.useContext(LocalizationContext);
  
    return (
        <DataList
          navigation={navigation}
          fetchFn={getProducts}
          render={({item}) => (
            <Pressable
            onPress={() => navigateToCreateUpdateProductScreen(navigation, item)}
          >
            <Box
              borderBottomWidth="1"
              borderColor="coolGray.200"
              pl="2"
              pr="5"
              py="2"
            >
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Product:Code')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.code}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Product:NameEn')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.nameEn}
                </Text>
              </HStack>
              <HStack space={1}>
                <Text color="coolGray.500">{t('::Product:NameCn')}:</Text>
                <Text color="coolGray.800" bold>
                  {item.nameCn}
                </Text>
              </HStack>
            </Box>
          </Pressable>
          )}
        />
    );
  }
  
  const navigateToCreateUpdateProductScreen = (navigation, product = {}) => {
    navigation.navigate('CreateUpdateProduct', {
      productId: product.id,
    });
  };
  
  export default ProductsScreen;