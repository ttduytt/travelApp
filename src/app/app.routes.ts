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
        component:ListUserComponent
    },

    {
        path:'post/create',
        component:CreatePostComponent
    },

    {
        path:'post/listPost',
        component:ListPostComponent
    },

    {
        path: 'post/formUpdate',
        component: UpdatePostComponent
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
        component:CreateCategoryComponent
    },

    {
        path:'user/listblock',
        component:ListBlockUserComponent
    },

    {
        path:'list/poinStatistics',
        component:PoinStatisticalComponent
    },

    {
        path:'list/chart',
        component:ChartComponent
    },
];
