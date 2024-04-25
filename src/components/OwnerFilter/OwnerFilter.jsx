export const OwnerFilter = ({ users, filter, onFilterChange }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        {...(filter === 'All' && {
          className: 'is-active',
        })}
        onClick={() => onFilterChange('All')}
      >
        All
      </a>
      {users.map(serverUser => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={serverUser.id}
          {...(serverUser.name === filter && {
            className: 'is-active',
          })}
          onClick={() => onFilterChange(serverUser.name)}
        >
          {serverUser.name}
        </a>
      ))}
    </p>
  );
};
