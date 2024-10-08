import * as React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import { Layers, LogOut, Settings, User } from 'lucide-react';
import SubNavigation from './elements/SubNavigation';
import synify from '@/assets/images/synify.svg';
import tw from 'twin.macro';

export default () => {
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    return (
        <SubNavigation>
            <SpinnerOverlay visible={isLoggingOut} />
            <div className='h-full flex flex-col'>
                <NavLink to={'/'} exact css={tw`w-full py-8 flex items-center justify-center text-3xl font-bold`}>
                    <img src={synify} alt='' />
                </NavLink>
                <SearchContainer />
                <NavLink to={'/'} exact>
                    <Layers className='w-5 h-5' />
                    <span>Dashboard</span>
                </NavLink>
                {rootAdmin && (
                    <a href={'/admin'} rel={'noreferrer'}>
                        <Settings className='w-5 h-5' />
                        <span>Admin</span>
                    </a>
                )}
                <NavLink to={'/account'}>
                    <User className='w-5 h-5' />
                    <span>Account</span>
                </NavLink>
                <button onClick={onTriggerLogout}>
                    <LogOut className='w-5 h-5' />
                    <span>Logout</span>
                </button>
            </div>
        </SubNavigation>
    );
};
