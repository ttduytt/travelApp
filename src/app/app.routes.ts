import { Routes } from '@angular/router';
import { ListUserComponent } from './admin/component/list-user/list-user.component';
import { CreatePostComponent } from './admin/component/create-post/create-post.component';
import { ListPostComponent } from './admin/component/list-post/list-post.component';
import { UpdatePostComponent } from './admin/component/update-post/update-post.component';
import { ContentPostComponent } from './user/content-post/content-post.component';
import { HompageUserComponent } from './user/hompage-user/hompage-user.component';
import { ViewallpostComponent } from './user/viewallpost/viewallpost.component';
import { CreateCategoryComponent } from './admin/component/create-category/create-category.component';
import { LoginComponent } from './shared/login/login.component';
import { ListBlockUserComponent } from './admin/component/list-block-user/list-block-user.component';
import { PoinStatisticalComponent } from './admin/component/poin-statistical/poin-statistical.component';
import { ChartComponent } from './admin/component/chart/chart.component';
import { ShowUserSearchComponent } from './user/show-user-search/show-user-search.component';
import { LibaryImageComponent } from './user/libary-image/libary-image.component';
import { ListImageComponent } from './admin/component/list-image/list-image.component';
import { ListPendingPostComponent } from './admin/component/list-pending-post/list-pending-post.component';
import { SubriceServiceComponent } from './user/subrice-service/subrice-service.component';
import { RenderServicePostComponent } from './user/render-service-post/render-service-post.component';
import { ListServiceComponent } from './user/list-service/list-service.component';
import { DetailPendingPostComponent } from './admin/component/detail-pending-post/detail-pending-post.component'
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ListServiceAdminComponent } from './admin/component/list-service-admin/list-service-admin.component';
import { ListPostCategoryComponent } from './user/list-post-category/list-post-category.component';
import { authGuard } from './admin/auth.guard';


export const routes: Routes = [

    {
        path:"",
        component:LoginComponent
    },
    {
        path:"home/user",
        component:HompageUserComponent
    },

    {
        path:'user/list',
        component:ListUserComponent,
        canActivate:[authGuard]
    },

    {
        path:'post/create',
        component:CreatePostComponent,
        canActivate:[authGuard]
    },

    {
        path:'post/listPost',
        component:ListPostComponent,
        canActivate:[authGuard]
    },

    {
        path: 'post/formUpdate',
        component: UpdatePostComponent,
        canActivate:[authGuard]
    },

    {
        path:'content/post/:title',
        component: ContentPostComponent
    },

    {
        path:'post/all',
        component:ViewallpostComponent
    },

    {
        path:'category/create',
        component:CreateCategoryComponent,
        canActivate:[authGuard]
    },

    {
        path:'user/listblock',
        component:ListBlockUserComponent,
        canActivate:[authGuard]
    },

    {
        path:'list/poinStatistics',
        component:PoinStatisticalComponent,
        canActivate:[authGuard]
    },

    {
        path:'list/chart',
        component:ChartComponent,
        canActivate:[authGuard]
    },

    {
        path:'post/userSearch/:keyword',
        component:ShowUserSearchComponent
    },

    {
        path:'image/libarly',
        component:LibaryImageComponent
    },

    {
        path: 'list/image',
        component:ListImageComponent,
        canActivate:[authGuard]
    },

    {
        path:'form/SubricePost',
        component:SubriceServiceComponent
    },

    {
        path: 'list/pendingPost',
        component:ListPendingPostComponent,
        canActivate:[authGuard]
    },

    {
        path:'detail/pendingPost/:id',
        component:DetailPendingPostComponent,
        canActivate:[authGuard]
    },

    {
        path:'service/:typeservice',
        component:ListServiceComponent
    },

    {
        path:'listPost/:typepost',
        component:ListPostCategoryComponent
    },

    {
        path:'service/detail/:id',
        component:RenderServicePostComponent
    },

    {
        path:'not-authorized',
        component:NotFoundComponent
    },

    {
        path:'list/servicesAdmin',
        component:ListServiceAdminComponent,
        canActivate:[authGuard]
    }

];
