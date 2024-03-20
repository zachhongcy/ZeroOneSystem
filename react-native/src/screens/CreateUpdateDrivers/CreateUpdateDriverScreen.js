import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createDriver, getDriverById, removeDriver, updateDriver } from '../../api/DriverAPI';
import CreateUpdateDriverForm from './CreateUpdateDriverForm';
import { Toast } from 'native-base';

function CreateUpdateDriverScreen({ navigation, route, startLoading, stopLoading }) {
  const [driver, setDriver] = useState();
  const driverId = route.params?.driverId;

  useEffect(() => {
    if (driverId) {
      getDriverById(driverId).then((data = {}) => setDriver(data));
    }
  }, []);

  const submit = data => {
    startLoading({ key: 'saveDriver' });
    let request;
    if (data.id) {
      request = updateDriver(data, driverId);
    } else {
      request = createDriver(data);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveDriver' }));
  };

  const remove = () => {
    startLoading({ key: 'remove driver' });
    removeDriver(driverId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'remove driver' }));
  };

  const renderForm = () => (
    <CreateUpdateDriverForm editingDriver={driver} submit={submit} remove={remove} />
  );

  if (driverId && driver) {
    return renderForm();
  }

  if (!driverId) {
    return renderForm();
  }

  return null;
}

CreateUpdateDriverScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateDriverScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
