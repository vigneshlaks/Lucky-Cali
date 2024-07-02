import React from 'react';
import ShinyButton from '../../archive/ShinyButton';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const EndNavigation = () => {
  return (
    <div>
      <Button variant="ringHover" className="font normal mr-2" size='sm' >
        <Link to={"/auth/login"}>
            {"Sign In"}
        </Link>
      </Button>
      <Button variant="ringHoverRed" className="font normal mr-2" size='sm' >
        <Link to={"/compete/"}>
            {"Compete"}
        </Link>
      </Button>
      <Button variant="ringHoverBlue" className="font normal " size='sm' >
        <Link to={"/spectate"}>
            {"Guide"}
        </Link>
      </Button>
    </div>
  );
};

export default EndNavigation;
