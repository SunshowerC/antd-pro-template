import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';


/**
 * 校验路由组件，如果无权限访问， 重定向
 * */
class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;

    console.log('this.props', this.props.location.pathname, redirectPath)

    /* 没有权限， 渲染重定向路由 */
    return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        {/* 有权限，直接访问 */}
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
