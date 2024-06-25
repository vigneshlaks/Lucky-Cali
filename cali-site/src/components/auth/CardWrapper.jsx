import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import AuthHeader from './AuthHeader.jsx';
import BackButton from './BackButton.jsx';
import PropTypes from 'prop-types';

const CardWrapper = ({ label, title, content, backButtonLabel, backButtonHref }) => {
  return (
    <Card className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

CardWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  backButtonLabel: PropTypes.string.isRequired,
  backButtonHref: PropTypes.string.isRequired,
};

export default CardWrapper;
