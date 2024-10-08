import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import AddonsContainer from '@/components/server/addons/AddonsContainer';
import {
    Activity,
    Blocks,
    CalendarDays,
    Database,
    DatabaseBackup,
    File,
    Network,
    Rocket,
    Settings,
    SquareChevronRight,
    Users,
} from 'lucide-react';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    exact?: boolean;
}

interface ServerRouteDefinition extends RouteDefinition {
    icon?: React.ComponentType;
    permission: string | string[] | null;
}

interface Routes {
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Account',
            component: AccountOverviewContainer,
            exact: true,
        },
        {
            path: '/api',
            name: 'API Credentials',
            component: AccountApiContainer,
        },
        {
            path: '/ssh',
            name: 'SSH Keys',
            component: AccountSSHContainer,
        },
        {
            path: '/activity',
            name: 'Activity',
            component: ActivityLogContainer,
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Console',
            component: ServerConsole,
            exact: true,
            icon: SquareChevronRight,
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Files',
            component: FileManagerContainer,
            icon: File,
        },
        {
            path: '/files/:action(edit|new)',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
            icon: undefined,
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Databases',
            component: DatabasesContainer,
            icon: Database,
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Schedules',
            component: ScheduleContainer,
            icon: CalendarDays,
        },
        {
            path: '/schedules/:id',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
            icon: undefined,
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Users',
            component: UsersContainer,
            icon: Users,
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Backups',
            component: BackupContainer,
            icon: DatabaseBackup,
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Network',
            component: NetworkContainer,
            icon: Network,
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Startup',
            component: StartupContainer,
            icon: Rocket,
        },
        {
            path: '/addons',
            permission: 'addons.*',
            name: 'Addons',
            component: AddonsContainer,
            icon: Blocks,
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Settings',
            component: SettingsContainer,
            icon: Settings,
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Activity',
            component: ServerActivityLogContainer,
            icon: Activity,
        },
    ],
} as Routes;
