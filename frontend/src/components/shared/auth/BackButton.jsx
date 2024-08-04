import { Button } from '../../ui/button'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackButton = ({label, href}) => {
  return (
    <Button variant="link" className="font normal w-full " size='sm' >
        <Link to={href}>
            {label}
        </Link>
    </Button>
  )
}

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default BackButton
