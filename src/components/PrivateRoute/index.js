import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
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
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: ROUTE.MAIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
