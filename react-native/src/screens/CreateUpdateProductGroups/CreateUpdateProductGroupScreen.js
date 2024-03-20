import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import CreateUpdateProductGroupForm from './CreateUpdateProductGroupForm';
import { createProductGroup, getProductGroupById, removeProductGroup, updateProductGroup } from '../../api/ProductGroupAPI';

function CreateUpdateProductGroupScreen({ navigation, route, startLoading, stopLoading }) {
  const [productGroup, setProductGroup] = useState();
  const productGroupId = route.params?.productGroupId;

  useEffect(() => {
    if (productGroupId) {
      getProductGroupById(productGroupId).then((data = {}) => setProductGroup(data));
    }
  }, []);

  const submit = data => {
    startLoading({ key: 'saveProductGroup' });
    let request;
    if (data.id) {
      request = updateProductGroup(data, productGroupId);
    } else {
      request = createProductGroup(data);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveProductGroup' }));
  };

  const remove = () => {
    startLoading({ key: 'remove product group' });
    removeProductGroup(productGroupId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'remove product group' }));
  };

  const renderForm = () => (
    <CreateUpdateProductGroupForm editingProductGroup={productGroup} submit={submit} remove={remove} />
  );

  if (productGroupId && productGroup) {
    return renderForm();
  }

  if (!productGroupId) {
    return renderForm();
  }

  return null;
}

CreateUpdateProductGroupScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateProductGroupScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
