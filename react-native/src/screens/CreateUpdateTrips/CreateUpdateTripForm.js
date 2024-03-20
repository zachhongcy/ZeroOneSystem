import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
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
import { getTripNo, getDrivers as getDrivers, getVehicles as getVehicles } from '../../api/TripAPI';

const validations = {
  tripType: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  tripDate: Yup.date().required('AbpAccount::ThisFieldIsRequired.'),
  tripStatus: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  customerName: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  referDocNo: Yup.number().required('AbpAccount::ThisFieldIsRequired.'),
  priority: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  driverId: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  vehicleId: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  siteName: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  siteDetail: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  siteAddress: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  contactPerson: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  contactNo: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
};

function CreateUpdateTripForm({ editingTrip = {}, submit, remove }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tripNo, setTripNo] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const customerNameRef = useRef();
  const referDocNoRef = useRef();
  const remarkRef = useRef();
  const siteNameRef = useRef();
  const siteAddressRef = useRef();
  const contactPersonRef = useRef();
  const contactNoRef = useRef();

  useEffect(() => {
    getDrivers().then((response) => {
        setDrivers(response.items);
    });

    getVehicles().then((response) => {
        setVehicles(response.items);
    });

    setSelectedDate(new Date(editingTrip.tripDate));
  }, []);

  const TripType = {
    Delivery: 0,
    Collection: 1
  }

  const TripStatus = {
    Pending: 0,
    Scheduled: 1,
    InProgress: 2,
    Delayed: 3,
    Completed: 4
  }

  const TripPriority = {
    Low: 0,
    Medium: 1,
    High: 2
  }

  const SiteDetail = {
    Block: 0,
    Lot: 1,
    Company: 2
  }
  
  const tripTypes = mapEnumToOptions(TripType);
  const tripStatuses = mapEnumToOptions(TripStatus);
  const tripPriorities = mapEnumToOptions(TripPriority);
  const siteDetails = mapEnumToOptions(SiteDetail);

  const handleTripTypeChange = value => {
    formik.setFieldValue('tripType', value);
    
    getTripNo().then((driverNo) => {
        const prefix = value === 0 ? 'D' : 'C';
        setTripNo(prefix + driverNo);
    });
  }

  const handleTripStatusChange = value => {
    formik.setFieldValue('tripStatus', value);
  }

  const handleTripPriorityChange = value => {
    formik.setFieldValue('priority', value);
  }

  const handleSiteDetailChange = value => {
    formik.setFieldValue('siteDetails', value);
  }

  const handleTripDateChange = (event, value) => {
    setShowDatePicker(false);
    formik.setFieldValue('tripDate', value);
    setSelectedDate(value);
  }

  const handleDriverChange = value => {
    formik.setFieldValue('driverId', value);
    setSelectedDriver(value);
  }

  const handleVehicleChange = value => {
    formik.setFieldValue('vehicleId', value);
    setSelectedVehicle(value);
  }

  const onSubmit = (values) => {
    submit({
      ...editingTrip,
      ...values,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validations,
    }),
    initialValues: {
      tripNo: tripNo,
      referDocNo: 0,
      ...editingTrip,
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
                    {i18n.t('::Trip:Type')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    isDisabled={editingTrip.id ? true : false}
                    onValueChange={handleTripTypeChange}
                    selectedValue={formik.values.tripType}
                    placeHolder="::Trip:SelectType">
                    {tripTypes.map(tripType => (
                        <Select.Item
                        label={i18n.t('::Trip:EnumType.' + tripType.value)}
                        value={tripType.value}
                        key={tripType.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.tripType}</ValidationMessage>
                </Stack>
                </FormControl>
            
              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Trip:Number')}
                  </FormControl.Label>
                  <Input
                    isReadOnly="true"
                    value={formik.values.tripNo}
                  />
                </Stack>
              </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:Date')}
                    </FormControl.Label>
                    <Button 
                    onPress={setShowDatePicker}>
                      Select Trip Date
                    </Button>
                    <Text>{selectedDate.toDateString()} </Text>
                    {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        onChange={handleTripDateChange}
                    />
                    )}
                    <ValidationMessage>
                    {formik.errors.tripDate}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:Status')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleTripStatusChange}
                    selectedValue={formik.values.tripStatus}
                    placeHolder="::Trip:SelectStatus">
                    {tripStatuses.map(tripStatus => (
                        <Select.Item
                        label={i18n.t('::Trip:EnumStatus.' + tripStatus.value)}
                        value={tripStatus.value}
                        key={tripStatus.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.tripStatus}</ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:CustomerName')}
                    </FormControl.Label>
                    <Input
                    ref={customerNameRef}
                    onSubmitEditing={() => referDocNoRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('customerName')}
                    onBlur={formik.handleBlur('customerName')}
                    value={formik.values.customerName}
                    />
                    <ValidationMessage>
                    {formik.errors.customerName}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:ReferDocNo')}
                    </FormControl.Label>
                    <Input
                    type="number"
                    keyboardType="numeric"
                    ref={referDocNoRef}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('referDocNo')}
                    onBlur={formik.handleBlur('referDocNo')}
                    value={formik.values.referDocNo.toString()}
                    />
                    <ValidationMessage>
                    {formik.errors.referDocNo}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:Priority')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleTripPriorityChange}
                    selectedValue={formik.values.priority}
                    placeHolder="::Trip:SelectPriority">
                    {tripPriorities.map(tripPriority => (
                        <Select.Item
                        label={i18n.t('::Trip:EnumPriority.' + tripPriority.value)}
                        value={tripPriority.value}
                        key={tripPriority.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.priority}</ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:Driver')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleDriverChange}
                    selectedValue={formik.values.driverId}
                    placeHolder="::Trip:SelectDriver">
                    {drivers.map(driver => (
                        <Select.Item
                        label={driver.driverName}
                        value={driver.id}
                        key={driver.id}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.driverId}</ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:Vehicle')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleVehicleChange}
                    selectedValue={formik.values.vehicleId}
                    placeHolder="::Trip:SelectVehicle">
                    {vehicles.map(vehicle => (
                        <Select.Item
                        label={vehicle.vehiclePlate}
                        value={vehicle.id}
                        key={vehicle.id}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.vehicle}</ValidationMessage>
                </Stack>
                </FormControl>

              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::Trip:Remark')}
                  </FormControl.Label>
                  <Input
                    ref={remarkRef}
                    returnKeyType="next"
                    onSubmitEditing={() => siteNameRef.current.focus()}
                    onChangeText={formik.handleChange('remark')}
                    onBlur={formik.handleBlur('remark')}
                    value={formik.values.remark}
                  />
                </Stack>
              </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:SiteName')}
                    </FormControl.Label>
                    <Input
                    ref={siteNameRef}
                    onChangeText={formik.handleChange('siteName')}
                    onBlur={formik.handleBlur('siteName')}
                    value={formik.values.siteName}
                    />
                    <ValidationMessage>
                    {formik.errors.siteName}
                    </ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:SiteDetails')}
                    </FormControl.Label>
                    <Select
                    mode="dropdown"
                    onValueChange={handleSiteDetailChange}
                    selectedValue={formik.values.siteDetail}
                    placeHolder="::Trip:SelectSiteDetail">
                    {siteDetails.map(siteDetail => (
                        <Select.Item
                        label={i18n.t('::Trip:EnumSiteDetail.' + siteDetail.value)}
                        value={siteDetail.value}
                        key={siteDetail.key}
                        />
                    ))}
                    </Select>
                    <ValidationMessage>{formik.errors.siteDetail}</ValidationMessage>
                </Stack>
                </FormControl>

                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:SiteAddress')}
                    </FormControl.Label>
                    <Input
                    keyboardType="numeric"
                    ref={siteAddressRef}
                    returnKeyType="next"
                    onSubmitEditing={() => contactPersonRef.current.focus()}
                    onChangeText={formik.handleChange('siteAddress')}
                    onBlur={formik.handleBlur('siteAddress')}
                    value={formik.values.siteAddress}
                    />
                    <ValidationMessage>
                    {formik.errors.siteAddress}
                    </ValidationMessage>
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:ContactPerson')}
                    </FormControl.Label>
                    <Input
                    ref={contactPersonRef}
                    onSubmitEditing={() => contactNoRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('contactPerson')}
                    onBlur={formik.handleBlur('contactPerson')}
                    value={formik.values.contactPerson}
                    />
                    <ValidationMessage>
                    {formik.errors.contactPerson}
                    </ValidationMessage>
                </Stack>
                </FormControl>
                
                <FormControl isRequired my="2">
                <Stack mx="4">
                    <FormControl.Label>
                    {i18n.t('::Trip:ContactNumber')}
                    </FormControl.Label>
                    <Input
                    ref={contactNoRef}
                    onChangeText={formik.handleChange('contactNo')}
                    onBlur={formik.handleBlur('contactNo')}
                    value={formik.values.contactNo}
                    />
                    <ValidationMessage>
                    {formik.errors.contactNo}
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
        isShowRemove={!!editingTrip.id}
      />
    </>
  );
}

CreateUpdateTripForm.propTypes = {
  editingTrip: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateTripForm;
