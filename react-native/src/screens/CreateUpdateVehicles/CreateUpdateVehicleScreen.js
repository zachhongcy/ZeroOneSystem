import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createVehicle, getVehicleById, removeVehicle, updateVehicle } from '../../api/VehicleAPI';
import CreateUpdateVehicleForm from './CreateUpdateVehicleForm';
import { Toast } from 'native-base';

function CreateUpdateVehicleScreen({ navigation, route, startLoading, stopLoading }) {
  const [vehicle, setVehicle] = useState();
  const vehicleId = route.params?.vehicleId;

  useEffect(() => {
    if (vehicleId) {
      getVehicleById(vehicleId).then((data = {}) => setVehicle(data));
    }
  }, []);

  const submit = data => {
    startLoading({ key: 'saveVehicle' });
    console.log('submitted = ' + JSON.stringify(data));
    let request;
    if (data.id) {
      request = updateVehicle(data, vehicleId);
    } else {
      request = createVehicle(data);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveVehicle' }));
  };

  const remove = () => {
    startLoading({ key: 'remove vehicle' });
    removeVehicle(vehicleId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'remove vehicle' }));
  };

  const renderForm = () => (
    <CreateUpdateVehicleForm editingVehicle={vehicle} submit={submit} remove={remove} />
  );

  if (vehicleId && vehicle) {
    return renderForm();
  }

  if (!vehicleId) {
    return renderForm();
  }

  return null;
}

CreateUpdateVehicleScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateVehicleScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
