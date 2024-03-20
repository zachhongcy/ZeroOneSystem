import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createProduct, getProductById, removeProduct, updateProduct } from '../../api/ProductAPI';
import CreateUpdateProductForm from './CreateUpdateProductForm';
import { Toast } from 'native-base';

function CreateUpdateProductScreen({ navigation, route, startLoading, stopLoading }) {
  const [product, setProduct] = useState();
  const productId = route.params?.productId;

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((data = {}) => setProduct(data));
    }
  }, []);

  const submit = data => {
    startLoading({ key: 'saveProduct' });
    let request;
    if (data.id) {
      request = updateProduct(data, productId);
    } else {
      request = createProduct(data);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveProduct' }));
  };

  const remove = () => {
    startLoading({ key: 'remove product' });
    removeProduct(productId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'remove product' }));
  };

  const renderForm = () => (
    <CreateUpdateProductForm editingProduct={product} submit={submit} remove={remove} />
  );

  if (productId && product) {
    return renderForm();
  }

  if (!productId) {
    return renderForm();
  }

  return null;
}

CreateUpdateProductScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateProductScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
