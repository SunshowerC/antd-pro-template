import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;


/**
 * 路由根入口，从这里开始匹配当前的layout 应该是 BasicLayout 还是 UserLayout。
 * 并且开始第一层校验： 用户登录校验，如果用户没有权限，直接跳转到 登录页面
 * */
function RouterConfig({ history, app }) {
  console.log('app', app)
  const routerData = getRouterData(app);

  // 总共只有两种layout ,
  // UserLayout : 登录注册时的layout
  // BasicLayout: 含有侧边栏，头部，面包屑等 组件的 layout
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;


  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>


          <Route path="/user" component={UserLayout} />


          {/* 第一层权限校验，如果没有权限，直接重定向到登录  */}
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/user/login', {
              redirect: window.location.href,
            })}
          />


        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
