import { useFormik, getIn } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Select,
  Stack,
  Text,
  Modal,
  Icon} from 'native-base';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, Pressable } from 'react-native';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { mapEnumToOptions } from '../../utils/FormUtils';
import * as ImagePicker from 'expo-image-picker';
import { GetFileNameFromUri } from '../../utils/StringExtensions';
import { getImage, getProductGroups } from '../../api/ProductAPI';
import { Ionicons } from '@expo/vector-icons';

const validations = {
  code: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  nameEn: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  nameCn: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  productGroupId: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  uom: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  quantityPr: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  quantityPa: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  quantityRn: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  quantityRu: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  status: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  location: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  owner: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  
  productSize: Yup.object().shape({
    type: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    height: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    length: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    width: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    thickness: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  }),
  
  productPrice: Yup.object().shape({
    standardPurchaseCost: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    minPurchaseCost: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    maxPurchaseCost: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    standardSellingPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    minSellingPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    maxSellingPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    standardRentalPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    minRentalPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
    maxRentalPrice: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  })
};

function CreateUpdateProductForm({ editingProduct = {}, submit, remove }) {
  const codeRef = useRef();
  const nameEnRef = useRef();
  const nameCnRef = useRef();
  const quantityPrRef = useRef();
  const quantityPaRef = useRef();
  const quantityRuRef = useRef();
  const quantityRnRef = useRef();
  const locationRef = useRef();
  const ownerRef = useRef();

  const typeRef = useRef();
  const heightRef = useRef();
  const lengthRef = useRef();
  const widthRef = useRef();
  const thicknessRef = useRef();
  const remarkRef = useRef();

  const standardPurchaseCostRef = useRef();
  const standardSellingPriceRef = useRef();
  const standardRentalPriceRef = useRef();
  const minPurchaseCostRef = useRef();
  const maxPurchaseCostRef = useRef();
  const sellingPrice2Ref = useRef();
  const sellingPrice3Ref = useRef();
  const minSellingPriceRef = useRef();
  const maxSellingPriceRef = useRef();
  const rentalPrice2Ref = useRef();
  const rentalPrice3Ref = useRef();
  const minRentalPriceRef = useRef();
  const maxRentalPriceRef = useRef();

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productGroups, setProductGroups] = useState([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (editingProduct.id) {
      getImage(editingProduct.id).then((imageContent) => {
        if (imageContent) {
          const uri = `data:image/jpeg;base64,${imageContent}`
          setSelectedImage(uri);
        }
      })
    }

    getProductGroups().then((response) => {
      setProductGroups(response.items);
    });
  }, []); 

  const Status = {
    Inactive: 0,
    Active: 1,
  }

  const Uom = {
    pcs: 0
  }
  
  const statuses = mapEnumToOptions(Status);
  const uoms = mapEnumToOptions(Uom);

  const handleStatusChange = (value) => {
    formik.setFieldValue('status', value);
  };

  const handleUomChange = value => {
    formik.setFieldValue('uom', value);
  }

  const handleProductGroupChange = value => {
    formik.setFieldValue('productGroupId', value);
    setSelectedProductGroup(value);
  }

  const onCameraPress = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
      cameraType: ImagePicker.CameraType.front,
    });

    setShowImagePicker(false);

    if (!result.canceled) {
      formik.setFieldValue('imageName', GetFileNameFromUri(result.assets[0].uri));
      formik.setFieldValue('imageContent', result.assets[0].base64);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onImageGalleryPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    setShowImagePicker(false);

    if (!result.canceled) {
      formik.setFieldValue('imageName', GetFileNameFromUri(result.assets[0].uri));
      formik.setFieldValue('imageContent', result.assets[0].base64);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onSubmit = (values) => {
    submit({
      ...editingProduct,
      ...values,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validations,
    }),
    initialValues: {
      status: '',
      uom: '',
      quantityPr: 0,
      quantityPa: 0,
      quantityRu: 0,
      quantityRn: 0,
      productSize: {
        height: 0,
        length: 0,
        width: 0,
        thickness: 0
      },
      productPrice: {
        standardPurchaseCost: 0,
        minPurchaseCost: 0,
        maxPurchaseCost: 0,
        standardSellingPrice: 0,
        sellingPrice2: 0,
        sellingPrice3: 0,
        minSellingPrice: 0,
        maxSellingPrice: 0,
        standardRentalPrice: 0,
        rentalPrice2: 0,
        rentalPrice3: 0,
        minRentalPrice: 0,
        maxRentalPrice: 0
      },
      ...editingProduct,
    },
    onSubmit,
  });

  return (
    <>
      <KeyboardAvoidingView
        h={{
          base: '800px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
        <Box w={{ base: '100%' }} px="4">
          <Button.Group
            colorScheme="blue"
            mx={{ base: 'auto', md: 0, }}
            size="sm"
            m="2">
            <Button
              size="sm"
              variant={selectedTab === 0 ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(0)}>
              {i18n.t('::Product:BasicDetails')}
            </Button>
            <Button
              size="sm"
              variant={selectedTab === 1 ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(1)}>
              {i18n.t('::Product:SizeDetails')}
            </Button>
            <Button
              size="sm"
              variant={selectedTab === 2 ? 'solid' : 'outline'}
              onPress={() => setSelectedTab(2)}>
              {i18n.t('::Product:PriceDetails')}
            </Button>
          </Button.Group>
          {selectedTab === 0 ? (
            <>
              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Product:Code')}
                  </FormControl.Label>
                  <Input
                    ref={codeRef}
                    onChangeText={formik.handleChange('code')}
                    onBlur={formik.handleBlur('code')}
                    value={formik.values.code}
                  />
                  <ValidationMessage>
                    {formik.errors.code}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Product:Picture')}
                  </FormControl.Label>
                  <Button onPress={() => setShowImagePicker(true)}>
                    {"Upload Image"}
                  </Button>
                  <Modal
                    isOpen={showImagePicker}
                    onClose={() => setShowImagePicker(false)}
                    onBackdropPress={() => setShowImagePicker(false)}
                    size="sm"
                  >
                    <Modal.Content maxWidth="350">
                      <Modal.Header>
                        Upload Image
                      </Modal.Header>
                      <Modal.Body>
                        <Pressable
                          style={styles.button}
                          onPress={onImageGalleryPress}
                        >
                          <Icon as={Ionicons} name={'image'} style={styles.icon} />
                          <Text style={styles.text}>Gallery</Text>
                        </Pressable>
                        <Pressable
                          style={styles.button}
                          onPress={onCameraPress}
                        >
                          <Icon as={Ionicons} name={'camera'} style={styles.icon} />
                          <Text style={styles.imageChangeText}>Camera</Text>
                        </Pressable>
                      </Modal.Body>
                    </Modal.Content>
                  </Modal>
                  {selectedImage && 
                    <Image
                    source={{ uri: selectedImage }}
                    alt="Product Image"
                    style={{ width: 200, height: 200, marginBottom: 20 }}>
                    </Image>}
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Product:NameEn')}
                  </FormControl.Label>
                  <Input
                    ref={nameEnRef}
                    onSubmitEditing={() => nameCnRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('nameEn')}
                    onBlur={formik.handleBlur('nameEn')}
                    value={formik.values.nameEn}
                  />
                  <ValidationMessage>
                    {formik.errors.nameEn}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Product:NameCn')}
                  </FormControl.Label>
                  <Input
                    ref={nameCnRef}
                    onChangeText={formik.handleChange('nameCn')}
                    onBlur={formik.handleBlur('nameCn')}
                    value={formik.values.nameCn}
                  />
                  <ValidationMessage>
                    {formik.errors.nameCn}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:ProductGroup')}
                  </FormControl.Label>
                  <Select
                  mode="dropdown"
                  onValueChange={handleProductGroupChange}
                  selectedValue={formik.values.productGroupId}
                  placeHolder="::Trip:SelectDriver">
                  {productGroups.map(productGroup => (
                      <Select.Item
                      label={productGroup.codeName}
                      value={productGroup.id}
                      key={productGroup.id}
                      />
                  ))}
                  </Select>
                  <ValidationMessage>{formik.errors.productGroupId}</ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Uom')}
                  </FormControl.Label>
                  <Select
                  mode="dropdown"
                  onValueChange={handleUomChange}
                  selectedValue={formik.values.uom}
                  placeHolder="::Product:SelectUom">
                  {uoms.map(uom => (
                      <Select.Item
                      label={i18n.t('::Product:EnumUom.' + uom.value)}
                      value={uom.value}
                      key={uom.key}
                      />
                  ))}
                  </Select>
                  <ValidationMessage>{formik.errors.uom}</ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:QuantityPr')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={quantityPrRef}
                  returnKeyType="next"
                  onSubmitEditing={() => quantityPaRef.current.focus()}
                  onChangeText={formik.handleChange('quantityPr')}
                  onBlur={formik.handleBlur('quantityPr')}
                  value={formik.values.quantityPr.toString()}
                  />
                  <ValidationMessage>
                  {formik.errors.quantityPr}
                  </ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:QuantityPa')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={quantityPaRef}
                  returnKeyType="next"
                  onSubmitEditing={() => quantityRuRef.current.focus()}
                  onChangeText={formik.handleChange('quantityPa')}
                  onBlur={formik.handleBlur('quantityPa')}
                  value={formik.values.quantityPa.toString()}
                  />
                  <ValidationMessage>
                  {formik.errors.quantityPa}
                  </ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:QuantityRu')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={quantityRuRef}
                  returnKeyType="next"
                  onSubmitEditing={() => quantityRnRef.current.focus()}
                  onChangeText={formik.handleChange('quantityRu')}
                  onBlur={formik.handleBlur('quantityRu')}
                  value={formik.values.quantityRu.toString()}
                  />
                  <ValidationMessage>
                  {formik.errors.quantityRu}
                  </ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:QuantityRn')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={quantityRnRef}
                  onChangeText={formik.handleChange('quantityRn')}
                  onBlur={formik.handleBlur('quantityRn')}
                  value={formik.values.quantityRn.toString()}
                  />
                  <ValidationMessage>
                  {formik.errors.quantityRn}
                  </ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Status')}
                  </FormControl.Label>
                  <Select
                  mode="dropdown"
                  onValueChange={handleStatusChange}
                  selectedValue={formik.values.status}
                  placeHolder="::Product:SelectStatus">
                  {statuses.map(status => (
                      <Select.Item
                      label={i18n.t('::Product:EnumStatus.' + status.value)}
                      value={status.value}
                      key={status.key}
                      />
                  ))}
                  </Select>
                  <ValidationMessage>{formik.errors.status}</ValidationMessage>
              </Stack>
              </FormControl>

              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Location')}
                  </FormControl.Label>
                  <Input
                  ref={locationRef}
                  onSubmitEditing={() => ownerRef.current.focus()}
                  returnKeyType="next"
                  onChangeText={formik.handleChange('location')}
                  onBlur={formik.handleBlur('location')}
                  value={formik.values.location}
                  />
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Owner')}
                  </FormControl.Label>
                  <Input
                  ref={ownerRef}
                  onChangeText={formik.handleChange('owner')}
                  onBlur={formik.handleBlur('owner')}
                  value={formik.values.owner}
                  />
                  <ValidationMessage>
                  {formik.errors.owner}
                  </ValidationMessage>
              </Stack>
              </FormControl>
            </>
          ) : selectedTab === 1 ? (
            <>
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Type')}
                  </FormControl.Label>
                  <Input
                  ref={typeRef}
                  returnKeyType="next"
                  onSubmitEditing={() => heightRef.current.focus()}
                  onChangeText={formik.handleChange('productSize.type')}
                  onBlur={formik.handleBlur('productSize.type')}
                  value={formik.values.productSize.type}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productSize.type')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Height')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={heightRef}
                  returnKeyType="next"
                  onSubmitEditing={() => lengthRef.current.focus()}
                  onChangeText={formik.handleChange('productSize.height')}
                  onBlur={formik.handleBlur('productSize.height')}
                  value={formik.values.productSize.height.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productSize.height')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Length')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={lengthRef}
                  returnKeyType="next"
                  onSubmitEditing={() => widthRef.current.focus()}
                  onChangeText={formik.handleChange('productSize.length')}
                  onBlur={formik.handleBlur('productSize.length')}
                  value={formik.values.productSize.length.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productSize.length')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Width')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={widthRef}
                  returnKeyType="next"
                  onSubmitEditing={() => thicknessRef.current.focus()}
                  onChangeText={formik.handleChange('productSize.width')}
                  onBlur={formik.handleBlur('productSize.width')}
                  value={formik.values.productSize.width.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productSize.width')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Thickness')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={thicknessRef}
                  returnKeyType="next"
                  onSubmitEditing={() => remarkRef.current.focus()}
                  onChangeText={formik.handleChange('productSize.thickness')}
                  onBlur={formik.handleBlur('productSize.thickness')}
                  value={formik.values.productSize.thickness.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productSize.thickness')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:Remark')}
                  </FormControl.Label>
                  <Input
                  ref={remarkRef}
                  onChangeText={formik.handleChange('productSize.remark')}
                  onBlur={formik.handleBlur('productSize.remark')}
                  value={formik.values.productSize.remark}
                  />
              </Stack>
              </FormControl>
            </>
          ) : selectedTab === 2 ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                {i18n.t('::Product:PurchaseCost')}
              </Text>
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:StandardPurchaseCost')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={standardPurchaseCostRef}
                  returnKeyType="next"
                  onSubmitEditing={() => minPurchaseCostRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.standardPurchaseCost')}
                  onBlur={formik.handleBlur('productPrice.standardPurchaseCost')}
                  value={formik.values.productPrice.standardPurchaseCost.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.standardPurchaseCost')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MinPurchaseCost')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={minPurchaseCostRef}
                  returnKeyType="next"
                  onSubmitEditing={() => maxPurchaseCostRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.minPurchaseCost')}
                  onBlur={formik.handleBlur('productPrice.minPurchaseCost')}
                  value={formik.values.productPrice.minPurchaseCost.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.minPurchaseCost')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MaxPurchaseCost')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={maxPurchaseCostRef}
                  returnKeyType="next"
                  onSubmitEditing={() => standardSellingPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.maxPurchaseCost')}
                  onBlur={formik.handleBlur('productPrice.maxPurchaseCost')}
                  value={formik.values.productPrice.maxPurchaseCost.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.maxPurchaseCost')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <Divider thickness={15} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                {i18n.t('::Product:SellingPrice')}
              </Text>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:StandardSellingPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={standardSellingPriceRef}
                  returnKeyType="next"
                  onSubmitEditing={() => sellingPrice2Ref.current.focus()}
                  onChangeText={formik.handleChange('productPrice.standardSellingPrice')}
                  onBlur={formik.handleBlur('productPrice.standardSellingPrice')}
                  value={formik.values.productPrice.standardSellingPrice.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.standardSellingPrice')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:SellingPrice2')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={sellingPrice2Ref}
                  returnKeyType="next"
                  onSubmitEditing={() => sellingPrice3Ref.current.focus()}
                  onChangeText={formik.handleChange('productPrice.sellingPrice2')}
                  onBlur={formik.handleBlur('productPrice.sellingPrice2')}
                  value={formik.values.productPrice.sellingPrice2.toString()}
                  />
              </Stack>
              </FormControl>
              
              <FormControl my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:SellingPrice3')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={sellingPrice3Ref}
                  returnKeyType="next"
                  onSubmitEditing={() => minSellingPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.sellingPrice3')}
                  onBlur={formik.handleBlur('productPrice.sellingPrice3')}
                  value={formik.values.productPrice.sellingPrice3.toString()}
                  />
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MinSellingPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={minSellingPriceRef}
                  returnKeyType="next"
                  onSubmitEditing={() => maxSellingPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.minSellingPrice')}
                  onBlur={formik.handleBlur('productPrice.minSellingPrice')}
                  value={formik.values.productPrice.minSellingPrice.toString()}
                  />
              </Stack>
              <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.minSellingPrice')}
              </ValidationMessage>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MaxSellingPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={maxSellingPriceRef}
                  returnKeyType="next"
                  onSubmitEditing={() => standardRentalPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.maxSellingPrice')}
                  onBlur={formik.handleBlur('productPrice.maxSellingPrice')}
                  value={formik.values.productPrice.maxSellingPrice.toString()}
                  />
              </Stack>
              <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.maxSellingPrice')}
              </ValidationMessage>
              </FormControl>
              
              <Divider thickness={15} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                {i18n.t('::Product:RentalPrice')}
              </Text>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:StandardRentalPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={standardRentalPriceRef}
                  returnKeyType="next"
                  onSubmitEditing={() => rentalPrice2Ref.current.focus()}
                  onChangeText={formik.handleChange('productPrice.standardRentalPrice')}
                  onBlur={formik.handleBlur('productPrice.standardRentalPrice')}
                  value={formik.values.productPrice.standardRentalPrice.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.standardRentalPrice')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:RentalPrice2')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={rentalPrice2Ref}
                  returnKeyType="next"
                  onSubmitEditing={() => rentalPrice3Ref.current.focus()}
                  onChangeText={formik.handleChange('productPrice.rentalPrice2')}
                  onBlur={formik.handleBlur('productPrice.rentalPrice2')}
                  value={formik.values.productPrice.rentalPrice2.toString()}
                  />
              </Stack>
              </FormControl>
              
              <FormControl my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:RentalPrice3')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={rentalPrice3Ref}
                  returnKeyType="next"
                  onSubmitEditing={() => minRentalPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.rentalPrice3')}
                  onBlur={formik.handleBlur('productPrice.rentalPrice3')}
                  value={formik.values.productPrice.rentalPrice3.toString()}
                  />
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MinRentalPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={minRentalPriceRef}
                  returnKeyType="next"
                  onSubmitEditing={() => maxRentalPriceRef.current.focus()}
                  onChangeText={formik.handleChange('productPrice.minRentalPrice')}
                  onBlur={formik.handleBlur('productPrice.minRentalPrice')}
                  value={formik.values.productPrice.minRentalPrice.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.minRentalPrice')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
              
              <FormControl isRequired my="2">
              <Stack mx="4">
                  <FormControl.Label>
                  {i18n.t('::Product:MaxRentalPrice')}
                  </FormControl.Label>
                  <Input
                  keyboardType="numeric"
                  ref={maxRentalPriceRef}
                  onChangeText={formik.handleChange('productPrice.maxRentalPrice')}
                  onBlur={formik.handleBlur('productPrice.maxRentalPrice')}
                  value={formik.values.productPrice.maxRentalPrice.toString()}
                  />
                  <ValidationMessage>
                    {getIn(formik.errors, 'productPrice.maxRentalPrice')}
                  </ValidationMessage>
              </Stack>
              </FormControl>
            </>
          ) : null}
        </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <FormButtons
        submit={formik.handleSubmit}
        isSubmitDisabled={!formik.isValid}
        remove={remove}
        removeMessage={i18n.t('::AreYouSureToDelete')}
        isShowRemove={!!editingProduct.id}
      />
    </>
  );
}

const styles = {
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    elevation: 5, // For shadow on Android
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: 'black', // Icon color
  },
  text: {
    fontSize: 18,
    color: 'black', // Text color
  },
};


CreateUpdateProductForm.propTypes = {
  editingProduct: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateProductForm;
