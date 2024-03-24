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
import { getDriverNo, getImage } from '../../api/DriverAPI';
import { Ionicons } from '@expo/vector-icons';

const validations = {
  driverName: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  licenseNo: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  licenseExpiryDate: Yup.date().required('AbpAccount::ThisFieldIsRequired.'),
  contactNo: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  employeeCategory: Yup.number().required('AbpAccount::ThisFieldIsRequired.'),
  password: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  status: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  emergencyContactName: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  emergencyRelationship: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  emergencyContactNo: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  address: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
};

function CreateUpdateDriverForm({ editingDriver = {}, submit, remove }) {
  const driverNoRef = useRef();
  const driverNameRef = useRef();
  const licenseNoRef = useRef();
  const licenseExpiryDateRef = useRef();
  const contactNoRef = useRef();
  const employeeCategoryRef = useRef();
  const passwordRef = useRef();
  const remarkRef = useRef();
  const emergencyContactNameRef = useRef();
  const emergencyRelationshipRef = useRef();
  const emergencyContactNoRef = useRef();
  const addressRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [driverNo, setDriverNo] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (editingDriver.id) {
      getImage(editingDriver.id).then((imageContent) => {
        if (imageContent) {
          const uri = `data:image/jpeg;base64,${imageContent}`
          setSelectedImage(uri);
        }
      })
    }

    getDriverNo().then((driverNo) => {
      setDriverNo(driverNo);
    });

    if (editingDriver.licenseExpiryDate) {
      setSelectedDate(new Date(editingDriver.licenseExpiryDate));
    } else {
      setSelectedDate(new Date());
    }
  }, []); 

  const Status = {
    Inactive: 0,
    Active: 1,
  }
  
  const statuses = mapEnumToOptions(Status);

  const handleStatusChange = (value) => {
    formik.setFieldValue('status', value);
  };

  const handleLicenseExpiryDateChange = (event, value) => {
    setShowDatePicker(false);
    formik.setFieldValue('licenseExpiryDate', value);
    setSelectedDate(value);
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
    formik.setFieldValue('licenseExpiryDate', selectedDate);
    submit({
      ...editingDriver,
      ...values,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validations,
    }),
    initialValues: {
      driverNo: driverNo,
      status: '',
      ...editingDriver,
    },
    onSubmit,
  });

  return (
    <>
      <KeyboardAvoidingView
        h={{
          base: '90%',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
        <Box w={{ base: '100%' }} px="4">
            <>
              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Driver:Number')}
                  </FormControl.Label>
                  <Input
                    ref={driverNoRef}
                    isReadOnly="true"
                    value={formik.values.driverNo}
                  />
                </Stack>
              </FormControl>

              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Driver:Picture')}
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
                    alt="Driver Image"
                    style={{ width: 200, height: 200, marginBottom: 20 }}>
                    </Image>}
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Driver:Name')}
                  </FormControl.Label>
                  <Input
                    ref={driverNameRef}
                    onSubmitEditing={() => licenseNoRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('driverName')}
                    onBlur={formik.handleBlur('driverName')}
                    value={formik.values.driverName}
                  />
                  <ValidationMessage>
                    {formik.errors.driverName}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Driver:LicenseNo')}
                  </FormControl.Label>
                  <Input
                    ref={licenseNoRef}
                    returnKeyType="next"
                    onSubmitEditing={() => licenseExpiryDateRef.current.focus()}
                    onChangeText={formik.handleChange('licenseNo')}
                    onBlur={formik.handleBlur('licenseNo')}
                    value={formik.values.licenseNo}
                  />
                  <ValidationMessage>
                    {formik.errors.licenseNo}
                  </ValidationMessage>
                </Stack>
              </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:LicenseExpiryDate')}
                    </FormControl.Label>
                    <Button 
                    onPress={setShowDatePicker}>
                      Select License Expiry Date
                    </Button>
                    <Text>{selectedDate.toDateString()} </Text>
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        onChange={handleLicenseExpiryDateChange}
                      />
                    )}
                    <ValidationMessage>
                    {formik.errors.licenseExpiryDate}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:ContactNo')}
                    </FormControl.Label>
                    <Input
                    ref={contactNoRef}
                    returnKeyType="next"
                    onSubmitEditing={() => employeeCategoryRef.current.focus()}
                    onChangeText={formik.handleChange('contactNo')}
                    onBlur={formik.handleBlur('contactNo')}
                    value={formik.values.contactNo}
                    />
                    <ValidationMessage>
                    {formik.errors.contactNo}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:EmployeeCategory')}
                    </FormControl.Label>
                    <Input
                    keyboardType="numeric"
                    ref={employeeCategoryRef}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    onChangeText={formik.handleChange('employeeCategory')}
                    onBlur={formik.handleBlur('employeeCategory')}
                    value={formik.values.employeeCategory}
                    />
                    <ValidationMessage>
                    {formik.errors.employeeCategory}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:Password')}
                    </FormControl.Label>
                    <Input
                    type="password"
                    ref={passwordRef}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                    />
                    <ValidationMessage>
                    {formik.errors.password}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:Status')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleStatusChange}
                    selectedValue={formik.values.status}
                    placeHolder="::Driver:SelectStatus">
                    {statuses.map(status => (
                        <Select.Item
                        label={i18n.t('::Driver:EnumStatus.' + status.value)}
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
                    {i18n.t('::Driver:Remark')}
                    </FormControl.Label>
                    <Input
                    ref={remarkRef}
                    onSubmitEditing={() => emergencyContactNameRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('remark')}
                    onBlur={formik.handleBlur('remark')}
                    value={formik.values.remark}
                    />
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:EmergencyContactName')}
                    </FormControl.Label>
                    <Input
                    ref={emergencyContactNameRef}
                    onSubmitEditing={() => emergencyRelationshipRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('emergencyContactName')}
                    onBlur={formik.handleBlur('emergencyContactName')}
                    value={formik.values.emergencyContactName}
                    />
                    <ValidationMessage>
                    {formik.errors.emergencyContactName}
                    </ValidationMessage>
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:Relationship')}
                    </FormControl.Label>
                    <Input
                    ref={emergencyRelationshipRef}
                    onSubmitEditing={() => emergencyContactNoRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('emergencyRelationship')}
                    onBlur={formik.handleBlur('emergencyRelationship')}
                    value={formik.values.emergencyRelationship}
                    />
                    <ValidationMessage>
                    {formik.errors.rememergencyRelationshipark}
                    </ValidationMessage>
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:EmergencyContactNo')}
                    </FormControl.Label>
                    <Input
                    ref={emergencyContactNoRef}
                    onSubmitEditing={() => addressRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('emergencyContactNo')}
                    onBlur={formik.handleBlur('emergencyContactNo')}
                    value={formik.values.emergencyContactNo}
                    />
                    <ValidationMessage>
                    {formik.errors.emergencyContactNo}
                    </ValidationMessage>
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Driver:Address')}
                    </FormControl.Label>
                    <Input
                    ref={addressRef}
                    onChangeText={formik.handleChange('address')}
                    onBlur={formik.handleBlur('address')}
                    value={formik.values.address}
                    />
                    <ValidationMessage>
                    {formik.errors.address}
                    </ValidationMessage>
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
        isShowRemove={!!editingDriver.id}
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

CreateUpdateDriverForm.propTypes = {
  editingDriver: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateDriverForm;
