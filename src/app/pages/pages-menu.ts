import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/app/dashboard',
    home: true,
  },
  {
    title: 'Friends',
    icon: 'people-outline',
    link: '/app/friends',
  },
  {
    title: 'Personnal section',
    group: true,
  },
  {
    title: 'Settings',
    icon: 'lock-outline',
    children: [
      {
        title: 'account',
        icon: 'person-outline',
        link: '/app/setting/account',
      },
    ],
  },
];
