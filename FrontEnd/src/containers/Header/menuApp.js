export const doctorMenu = [
   {
      //   quản lí kế hoạch khám bệnh của bác sĩ
      name: 'menu.doctor.manage-user',
      menus: [
         {
            name: 'menu.doctor.manage-schedule',
            link: '/doctor/manage-schedule',
         },
         {
            name: 'menu.doctor.manage-patient',
            link: '/doctor/manage-patient',
         },
      ],
   },
];
export const adminMenu = [
   {
      //   quản lí người dùng
      name: 'menu.admin.manage-user',
      menus: [
         {
            name: 'menu.admin.crud',
            link: '/system/user-manager',
         },
         {
            name: 'menu.admin.crud-redux',
            link: '/system/user-redux',
         },
         {
            name: 'menu.admin.manage-doctor',
            link: '/system/manage-doctor',
            // subMenus: [
            //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            // ]
         },
         {
            //   quản lí kế hoạch khám bệnh của bác sĩ
            name: 'menu.doctor.manage-schedule',
            link: '/doctor/manage-schedule',
         },

         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
      ],
   },
   {
      //quản lí phòng khám
      name: 'menu.admin.clinic',
      menus: [
         {
            name: 'menu.admin.manage-clinic',
            link: '/system/manage-clinic',
         },
      ],
   },
   {
      //quản lí chuyên khoa
      name: 'menu.admin.specialty',
      menus: [
         {
            name: 'menu.admin.manage-specialty',
            link: '/system/manage-specialty',
         },
      ],
   },
   {
      //quản lí bài đăng
      name: 'menu.admin.handbook',
      menus: [
         {
            name: 'menu.admin.manage-handbook',
            link: '/system/manage-handbook',
         },
      ],
   },
];
