import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import LoadingActions from '../../store/actions/LoadingActions';
import { createLoadingSelector } from '../../store/selectors/LoadingSelectors';
import { connectToRedux } from '../../utils/ReduxConnect';
import { createTrip, getTripById, removeTrip, updateTrip } from '../../api/TripAPI';
import CreateUpdateTripForm from './CreateUpdateTripForm';

function CreateUpdateTripScreen({ navigation, route, startLoading, stopLoading }) {
  const [trip, setTrip] = useState();
  const tripId = route.params?.tripId;

  useEffect(() => {
    if (tripId) {
      getTripById(tripId).then((data = {}) => setTrip(data));
    }
  }, []);

  const submit = data => {
    startLoading({ key: 'saveTrip' });
    let request;
    if (data.id) {
      request = updateTrip(data, tripId);
    } else {
      request = createTrip(data);
    }

    request
      .then(() => {
        navigation.goBack();
      })
      .finally(() => stopLoading({ key: 'saveTrip' }));
  };

  const remove = () => {
    startLoading({ key: 'remove trip' });
    removeTrip(tripId)
      .then(() => navigation.goBack())
      .finally(() => stopLoading({ key: 'remove trip' }));
  };

  const renderForm = () => (
    <CreateUpdateTripForm editingTrip={trip} submit={submit} remove={remove} />
  );

  if (tripId && trip) {
    return renderForm();
  }

  if (!tripId) {
    return renderForm();
  }

  return null;
}

CreateUpdateTripScreen.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
};

export default connectToRedux({
  component: CreateUpdateTripScreen,
  stateProps: state => ({ loading: createLoadingSelector()(state) }),
  dispatchProps: {
    startLoading: LoadingActions.start,
    stopLoading: LoadingActions.stop,
  },
});
