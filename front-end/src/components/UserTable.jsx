import React from 'react';
import PropTypes from 'prop-types';

function UserTable({ user, index }) {
  const { name, role, email } = user;

  const TEST_ID = 'admin_manage__element-';

  return (
    <tr>
      <td
        data-testid={ `${TEST_ID}user-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `${TEST_ID}user-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `${TEST_ID}user-table-email-${index}` }
      >
        { email }
      </td>
      <td
        data-testid={ `${TEST_ID}user-table-role-${index}` }
      >
        { role === 'seller' ? 'P. Vendedora' : 'Cliente' }
      </td>
      <td
        data-testid={ `${TEST_ID}user-table-remove-${index}` }
      >
        <button
          type="button"
          onClick={ () => console.log('a') }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserTable.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default UserTable;
