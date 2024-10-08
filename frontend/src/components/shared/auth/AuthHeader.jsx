import PropTypes from 'prop-types';

const AuthHeader = ({label, title}) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold"> {title} </h1>
      <p className="text-muted-foreground text sm">{label}</p>
    </div>
  )
}

AuthHeader.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthHeader;
