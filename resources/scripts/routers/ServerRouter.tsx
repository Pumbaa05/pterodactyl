import TransferListener from '@/components/server/TransferListener';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
//import NavigationBar from '@/components/NavigationBar';
import TransitionRouter from '@/TransitionRouter';
import WebsocketHandler from '@/components/server/WebsocketHandler';
import { ServerContext } from '@/state/server';
import { CSSTransition } from 'react-transition-group';
import Can from '@/components/elements/Can';
import Spinner from '@/components/elements/Spinner';
import { NotFound, ServerError } from '@/components/elements/ScreenBlock';
import { httpErrorToHuman } from '@/api/http';
import { useStoreState } from 'easy-peasy';
import SubNavigation from '@/components/elements/SubNavigation';
import InstallListener from '@/components/server/InstallListener';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import { useLocation } from 'react-router';
import ConflictStateRenderer from '@/components/server/ConflictStateRenderer';
import PermissionRoute from '@/components/elements/PermissionRoute';
import routes from '@/routers/routes';
import { ExternalLink } from 'lucide-react';
import tw from 'twin.macro';
import synify from '@/assets/images/synify.svg';

export default () => {
    const match = useRouteMatch<{ id: string }>();
    const location = useLocation();

    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [error, setError] = useState('');

    const id = ServerContext.useStoreState((state) => state.server.data?.id);
    const uuid = ServerContext.useStoreState((state) => state.server.data?.uuid);
    const inConflictState = ServerContext.useStoreState((state) => state.server.inConflictState);
    const serverId = ServerContext.useStoreState((state) => state.server.data?.internalId);
    const getServer = ServerContext.useStoreActions((actions) => actions.server.getServer);
    const clearServerState = ServerContext.useStoreActions((actions) => actions.clearServerState);

    const to = (value: string, url = false) => {
        if (value === '/') {
            return url ? match.url : match.path;
        }
        return `${(url ? match.url : match.path).replace(/\/*$/, '')}/${value.replace(/^\/+/, '')}`;
    };

    useEffect(
        () => () => {
            clearServerState();
        },
        []
    );

    useEffect(() => {
        setError('');

        getServer(match.params.id).catch((error) => {
            console.error(error);
            setError(httpErrorToHuman(error));
        });

        return () => {
            clearServerState();
        };
    }, [match.params.id]);

    return (
        <React.Fragment key={'server-router'}>
            {/*<NavigationBar />*/}
            {!uuid || !id ? (
                error ? (
                    <ServerError message={error} />
                ) : (
                    <Spinner size={'large'} centered />
                )
            ) : (
                <div className='md:grid md:grid-cols-[60px,auto] 2xl:grid-cols-[240px,auto] min-h-full'>
                    <CSSTransition timeout={150} classNames={'fade'} appear in>
                        <SubNavigation>
                            <div className='h-full flex flex-col'>
                                <NavLink
                                    to={'/'}
                                    exact
                                    css={tw`w-full py-8 flex items-center justify-center text-3xl font-bold`}
                                >
                                    <img src={synify} alt='' css={tw`text-purple-500 mx-1 2xl:mx-4`} />
                                </NavLink>
                                {routes.server
                                    .filter((route) => !!route.name)
                                    .map((route) =>
                                        route.permission ? (
                                            <Can key={route.path} action={route.permission} matchAny>
                                                <NavLink to={to(route.path, true)} exact={route.exact}>
                                                    {route.icon && <route.icon />}
                                                    <span>{route.name}</span>
                                                </NavLink>
                                            </Can>
                                        ) : (
                                            <NavLink key={route.path} to={to(route.path, true)} exact={route.exact}>
                                                {route.icon && <route.icon />}
                                                <span>{route.name}</span>
                                            </NavLink>
                                        )
                                    )}
                                {rootAdmin && (
                                    // eslint-disable-next-line react/jsx-no-target-blank
                                    <a href={`/admin/servers/view/${serverId}`} target={'_blank'}>
                                        <ExternalLink />
                                    </a>
                                )}
                            </div>
                        </SubNavigation>
                    </CSSTransition>
                    <InstallListener />
                    <TransferListener />
                    <WebsocketHandler />
                    {inConflictState && (!rootAdmin || (rootAdmin && !location.pathname.endsWith(`/server/${id}`))) ? (
                        <ConflictStateRenderer />
                    ) : (
                        <ErrorBoundary>
                            <TransitionRouter>
                                <Switch location={location}>
                                    {routes.server.map(({ path, permission, component: Component }) => (
                                        <PermissionRoute key={path} permission={permission} path={to(path)} exact>
                                            <Spinner.Suspense>
                                                <Component />
                                            </Spinner.Suspense>
                                        </PermissionRoute>
                                    ))}
                                    <Route path={'*'} component={NotFound} />
                                </Switch>
                            </TransitionRouter>
                        </ErrorBoundary>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};
