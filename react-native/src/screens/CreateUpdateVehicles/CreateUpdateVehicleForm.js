import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  FormControl,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Select,
  Stack,
  Text} from 'native-base';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { mapEnumToOptions } from '../../utils/FormUtils';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { GetFileNameFromUri } from '../../utils/StringExtensions';
import { getImage } from '../../api/VehicleAPI';
import { Ionicons } from '@expo/vector-icons';

const validations = {
  vehicleType: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  vehiclePlate: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  vehicleModel: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  roadTaxExpiryDate: Yup.date().required('AbpAccount::ThisFieldIsRequired.'),
  serviceDate: Yup.date().required('AbpAccount::ThisFieldIsRequired.'),
  status: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
};

function CreateUpdateVehicleForm({ editingVehicle = {}, submit, remove }) {
  const vehiclePlateRef = useRef();
  const vehicleModelRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRoadTaxDate, setSelectedRoadTaxDate] = useState(new Date());
  const [selectedServiceDate, setSelectedServiceDate] = useState(new Date());
  const [showRoadTaxDatePicker, setShowRoadTaxDatePicker] = useState(false);
  const [showServiceDatePicker, setShowServiceDatePicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (editingVehicle.id) {
      getImage(editingVehicle.id).then((imageContent) => {
        if (imageContent) {
          const uri = `data:image/jpeg;base64,${imageContent}`
          setSelectedImage(uri);
        }
      })
    }

    setSelectedRoadTaxDate(new Date(editingVehicle.roadTaxExpiryDate));
    setSelectedServiceDate(new Date(editingVehicle.serviceDate));
  }, []); 

  const Status = {
    Inactive: 0,
    Active: 1,
  }

  const VehicleType = {
    Light: 0,
    Medium: 1,
    HeavyDuty: 2
  }
  
  const statuses = mapEnumToOptions(Status);
  const vehicleTypes = mapEnumToOptions(VehicleType);

  const handleStatusChange = (value) => {
    formik.setFieldValue('status', value);
  };

  const handleVehicleTypeChange = value => {
    formik.setFieldValue('vehicleType', value);
  }

  const handleRoadTaxDateChange = (event, value) => {
    setShowRoadTaxDatePicker(false);
    setSelectedRoadTaxDate(value);
    formik.setFieldValue('roadTaxExpiryDate', value);
  }

  const handleServiceDateChange = (event, value) => {
    setShowServiceDatePicker(false);
    setSelectedServiceDate(value);
    formik.setFieldValue('serviceDate', value);
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
    formik.setFieldValue('roadTaxExpiryDate', selectedRoadTaxDate);
    formik.setFieldValue('serviceDate', selectedServiceDate);
    submit({
      ...editingVehicle,
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
      roadTaxExpiryDate: '',
      serviceDate: '',
      ...editingVehicle,
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
            <>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:Type')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleVehicleTypeChange}
                    selectedValue={formik.values.vehicleType}
                    placeHolder="::Vehicle:SelectType">
                    {vehicleTypes.map(type => (
                        <Select.Item
                        label={i18n.t('::Vehicle:EnumType.' + type.value)}
                        value={type.value}
                        key={type.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.vehicleType}</ValidationMessage>
                </Stack>
                </FormControl>

              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Vehicle:Picture')}
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
                    alt={i18n.t('::Vehicle:Picture')}
                    style={{ width: 200, height: 200, marginBottom: 20 }}>
                    </Image>}
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Vehicle:Plate')}
                  </FormControl.Label>
                  <Input
                    ref={vehiclePlateRef}
                    onSubmitEditing={() => vehicleModelRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('vehiclePlate')}
                    onBlur={formik.handleBlur('vehiclePlate')}
                    value={formik.values.vehiclePlate}
                  />
                  <ValidationMessage>
                    {formik.errors.vehiclePlate}
                  </ValidationMessage>
                </Stack>
              </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:Model')}
                    </FormControl.Label>
                    <Input
                    ref={vehicleModelRef}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('vehicleModel')}
                    onBlur={formik.handleBlur('vehicleModel')}
                    value={formik.values.vehicleModel}
                    />
                    <ValidationMessage>
                    {formik.errors.vehicleModel}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:RoadTaxExpiryDate')}
                    </FormControl.Label>
                    <Button 
                    onPress={setShowRoadTaxDatePicker}>
                      Select License Expiry Date
                    </Button>
                    <Text>{selectedRoadTaxDate.toDateString()} </Text>
                    {showRoadTaxDatePicker && (
                      <DateTimePicker
                        value={selectedRoadTaxDate}
                        mode="date"
                        onChange={handleRoadTaxDateChange}
                      />
                    )}
                    <ValidationMessage>
                    {formik.errors.roadTaxExpiryDate}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:ServiceDate')}
                    </FormControl.Label>
                    <Button 
                    onPress={setShowServiceDatePicker}>
                      Select Service Date
                    </Button>
                    <Text>{selectedServiceDate.toDateString()} </Text>
                    {showServiceDatePicker && (
                    <DateTimePicker
                        value={selectedServiceDate}
                        mode="date"
                        onChange={handleServiceDateChange}
                    />
                    )}
                    <ValidationMessage>
                    {formik.errors.serviceDate}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:Status')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleStatusChange}
                    selectedValue={formik.values.status}
                    placeHolder="::Vehicle:SelectStatus">
                    {statuses.map(status => (
                        <Select.Item
                        label={i18n.t('::Vehicle:EnumStatus.' + status.value)}
                        value={status.value}
                        key={status.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.status}</ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Vehicle:Remark')}
                    </FormControl.Label>
                    <Input
                    returnKeyType="next"
                    onChangeText={formik.handleChange('remark')}
                    onBlur={formik.handleBlur('remark')}
                    value={formik.values.remark}
                    />
                </Stack>
                </FormControl>
            </>
        </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <FormButtons
        submit={formik.handleSubmit}
        isSubmitDisabled={!formik.isValid}
        remove={remove}
        removeMessage={i18n.t('::AreYouSureToDelete')}
        isShowRemove={!!editingVehicle.id}
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

CreateUpdateVehicleForm.propTypes = {
  editingVehicle: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateVehicleForm;
