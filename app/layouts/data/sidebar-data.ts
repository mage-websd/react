import { Command } from 'lucide-react';
import { type SidebarData } from '~/lib/types/nav';

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: Command,
        },
        {
          title: 'Api',
          url: '/call-api',
          icon: Command,
        },
        {
          title: 'Apps',
          url: '#',
          icon: Command,
        },
        {
          title: 'Chats',
          url: '#',
          badge: '3',
          icon: Command,
        },
        {
          title: 'Users',
          url: '#',
          icon: Command,
        },
        {
          title: 'Secured by Clerk',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: '/auth/login',
            },
            {
              title: 'Sign Up',
              url: '#',
            },
            {
              title: 'User Management',
              url: '#',
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: '/auth/login',
            },
            {
              title: 'Sign In (2 Col)',
              url: '#',
            },
            {
              title: 'Sign Up',
              url: '#',
            },
            {
              title: 'Forgot Password',
              url: '#',
            },
            {
              title: 'OTP',
              url: '#',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Command,
          items: [
            {
              title: 'Throw Error',
              url: '/throw-error',
              icon: Command,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: Command,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: Command,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: Command,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: Command,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Command,
          items: [
            {
              title: 'Profile',
              url: '#',
              icon: Command,
            },
            {
              title: 'Account',
              url: '#',
              icon: Command,
            },
            {
              title: 'Appearance',
              url: '#',
              icon: Command,
            },
            {
              title: 'Notifications',
              url: '#',
              icon: Command,
            },
            {
              title: 'Display',
              url: '#',
              icon: Command,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/404xxx',
          icon: Command,
        },
      ],
    },
  ],
};
