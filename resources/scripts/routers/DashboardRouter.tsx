import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';
import synify from '@/assets/images/synify.svg';
import tw from 'twin.macro';

export default () => {
    const location = useLocation();

    return (
        <div className='md:grid md:grid-cols-[60px,auto] 2xl:grid-cols-[240px,auto] min-h-full'>
            {location.pathname.startsWith('/account') ? (
                <SubNavigation>
                    <div className='h-full flex flex-col'>
                        <NavLink
                            to={'/'}
                            exact
                            css={tw`w-full py-8 flex items-center justify-center text-3xl font-bold`}
                        >
                            <img src={synify} alt='logo' />
                        </NavLink>
                        {routes.account
                            .filter((route) => !!route.name)
                            .map(({ path, name, exact = false }) => (
                                <NavLink key={path} to={`/account/${path}`.replace('//', '/')} exact={exact}>
                                    {name}
                                </NavLink>
                            ))}
                    </div>
                </SubNavigation>
            ) : (
                <NavigationBar />
            )}
            <TransitionRouter>
                <React.Suspense fallback={<Spinner centered />}>
                    <Switch location={location}>
                        <Route path={'/'} exact>
                            <DashboardContainer />
                        </Route>
                        {routes.account.map(({ path, component: Component }) => (
                            <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                <Component />
                            </Route>
                        ))}
                        <Route path={'*'}>
                            <NotFound />
                        </Route>
                    </Switch>
                </React.Suspense>
            </TransitionRouter>
        </div>
    );
};
