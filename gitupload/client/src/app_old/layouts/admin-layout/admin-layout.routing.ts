import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
// import { BusinesstypemoduleModule } from '../../businesstypemodule/businesstypemodule.module';
import { AuthGuardService as AuthGuard } from '../../services/authGuard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'businesstype',
      loadChildren: '../../businesstypemodule/businesstypemodule.module#BusinesstypemoduleModule',
       canActivateChild:[AuthGuard]
    	},
   { path: '',
      loadChildren: '../../businesstypemodule/businesstypemodule.module#BusinesstypemoduleModule'
        },     
    { path: 'formtype',
      loadChildren: '../../formtype/formtype.module#FormtypeModule',
       canActivateChild:[AuthGuard]
        },
    { 
      path: 'company',
        loadChildren: '../../company/company.module#CompanyModule',
         canActivateChild:[AuthGuard]
    },
    { path: 'user',
        loadChildren: '../../user/user.module#UserModule'
    },
     { path: 'user-role',
        loadChildren: '../../user-role/userRole.module#UserRoleModule',
         canActivateChild:[AuthGuard]
    },
     { path: 'customer',
        loadChildren: '../../customer/customer.module#CustomerModule',
         canActivateChild:[AuthGuard]

    },
    { path: 'video-capture',
        loadChildren: '../../videosignature/videosignature.module#VideosignatureModule',
         canActivateChild:[AuthGuard]

    },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
