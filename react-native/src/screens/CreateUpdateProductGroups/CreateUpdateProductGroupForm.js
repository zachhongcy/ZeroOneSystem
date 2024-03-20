import { useFormik } from 'formik';
import i18n from 'i18n-js';
import {
  Box,
  Checkbox,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Select,
  Stack
} from 'native-base';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Yup from 'yup';
import { FormButtons } from '../../components/FormButtons';
import ValidationMessage from '../../components/ValidationMessage/ValidationMessage';
import { mapEnumToOptions } from '../../utils/FormUtils';

const validations = {
  name: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  shortCode: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
  status: Yup.string().required('AbpAccount::ThisFieldIsRequired.'),
};

function CreateUpdateProductGroupForm({ editingProductGroup = {}, submit, remove }) {
  const nameRef = useRef();
  const shortCodeRef = useRef();
  const descriptionRef = useRef();

  const Status = {
    Inactive: 0,
    Active: 1,
  }
  
  const statuses = mapEnumToOptions(Status);

  const handleStatusChange = (value) => {
    formik.setFieldValue('status', value);
  };

  const onSubmit = (values) => {
    submit({
      ...editingProductGroup,
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
      isForSales: false,
      ...editingProductGroup,
    },
    onSubmit,
  });

  return (
    <>
      <KeyboardAvoidingView
        h={{
          base: '400px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Box w={{ base: '100%' }} px="4">
            <>
              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::ProductGroup:Name')}
                  </FormControl.Label>
                  <Input
                    ref={nameRef}
                    onSubmitEditing={() => shortCodeRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('name')}
                    onBlur={formik.handleBlur('name')}
                    value={formik.values.name}
                    autoCapitalize="none"
                  />
                  <ValidationMessage>
                    {formik.errors.name}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::ProductGroup:ShortCode')}
                  </FormControl.Label>
                  <Input
                    ref={shortCodeRef}
                    onSubmitEditing={() => descriptionRef.current.focus()}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('shortCode')}
                    onBlur={formik.handleBlur('shortCode')}
                    value={formik.values.shortCode}
                  />
                  <ValidationMessage>
                    {formik.errors.shortCode}
                  </ValidationMessage>
                </Stack>
              </FormControl>

              <FormControl my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::ProductGroup:Description')}
                  </FormControl.Label>
                  <Input
                    ref={descriptionRef}
                    returnKeyType="next"
                    onChangeText={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    value={formik.values.description}
                  />
                </Stack>
              </FormControl>

              <FormControl isRequired my="2">
                <Stack mx="4">
                  <FormControl.Label>
                    {i18n.t('::ProductGroup:Status')}
                  </FormControl.Label>
                  <Select
                    mode="dropdown"
                    onValueChange={handleStatusChange}
                    selectedValue={formik.values.status}
                    placeHolder="::ProductGroup:SelectStatus">
                    {statuses.map(status => (
                      <Select.Item
                        label={i18n.t('::ProductGroup:EnumStatus.' + status.value)}
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
                  <Checkbox
                    isChecked={formik.values.isForSales}
                    onPress={() =>
                      formik.setFieldValue(
                        'isForSales',
                        !formik.values.isForSales
                      )
                    }
                  >
                    {i18n.t('::ProductGroup:IsForSales')}
                  </Checkbox>
                </Stack>
              </FormControl>
            </>
        </Box>
      </KeyboardAvoidingView>
      <FormButtons
        submit={formik.handleSubmit}
        isSubmitDisabled={!formik.isValid}
        remove={remove}
        removeMessage={i18n.t('::AreYouSureToDelete')}
        isShowRemove={!!editingProductGroup.id}
      />
    </>
  );
}

CreateUpdateProductGroupForm.propTypes = {
  editingProductGroup: PropTypes.object,
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CreateUpdateProductGroupForm;
