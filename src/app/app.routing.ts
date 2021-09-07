import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
    // { path: '', redirectTo: 'index', pathMatch: 'full' },
    // { path: 'index',                component: ComponentsComponent },
    // { path: 'nucleoicons',          component: NucleoiconsComponent },
    // { path: 'examples/landing',     component: LandingComponent },
    // { path: 'examples/login',       component: LoginComponent },
    // { path: '', component: ComponentsComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    // { path: 'profile',     component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
