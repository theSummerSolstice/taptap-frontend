import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ROUTE from '../../constants/route';

const PrivateRoute = ({
  authenticated,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated
          ?
            render
              ? render(props)
              : <Component {...props} />
          : <Redirect
              to={{ pathname: ROUTE.MAIN, state: { from: props.location } }}
            />
      }
    />
  );
};

export default PrivateRoute;
