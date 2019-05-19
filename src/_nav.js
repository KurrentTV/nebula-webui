export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },

    {
      name: 'Settings',
      url: '/theme/colors',
      icon: 'icon-settings',
    },
    {
      name: 'Users',
      url: '/theme/typography',
      icon: 'icon-people',
    },

    {
      name: 'Assets',
      url: '/assets',
      icon: 'fa fa-database',
    },
    {
      name: 'Copy',
      url: '/copy',
      icon: 'fa fa-database',
    },
    {
      name: 'Jobs',
      url: '/buttons',
      icon: 'fa fa-tasks',
      children: [
        {
          name: 'Active',
          url: '/buttons/buttons',
          icon: 'fa fa-tasks',
        },
        {
          name: 'Finished',
          url: '/buttons/brand-buttons',
          icon: 'fa fa-tasks',
        },
        {
          name: 'Failed',
          url: '/buttons/button-groups',
          icon: 'fa fa-tasks',
        },

      ],
    },
    {
      name: 'Scheduler',
      url: '/charts',
      icon: 'icon-calendar'
    },
    {
      name: 'Rundown',
      url: '/editors',
      icon: 'icon-list',
    },
    {
      name: 'Services',
      url: '/forms',
      icon: 'fa fa-wrench',
    },
    {
      name: 'Help',
      url: '/google-maps',
      icon: 'cui-info',
    },
  ]
};
