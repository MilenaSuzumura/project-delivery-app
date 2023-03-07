import PropTypes from 'prop-types';

function CustomerOrderDetails({ match }) {
  const { id } = match.params;
  return (
    <div>
      {id}
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDetails;
