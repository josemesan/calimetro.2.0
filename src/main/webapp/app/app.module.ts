import './vendor.ts';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CalimetroSharedModule, UserRouteAccessService } from './shared';
import { CalimetroAppRoutingModule} from './app-routing.module';
import { CalimetroHomeModule } from './home/home.module';
import { CalimetroAdminModule } from './admin/admin.module';
import { CalimetroAccountModule } from './account/account.module';
import { CalimetroEntityModule } from './entities/entity.module';
import { CalimetroGraficasModule } from './graficas';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import {ExcelService} from './excel/excelservice.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

// import { ChartsModule } from 'ng2-charts';
import {ExcelComponent} from './excel/excel.component';

@NgModule({
    imports: [
        // ChartsModule,
        BrowserModule,
        CalimetroAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CalimetroSharedModule,
        CalimetroHomeModule,
        CalimetroAdminModule,
        CalimetroAccountModule,
        CalimetroEntityModule,
        CalimetroGraficasModule,
        // jhipster-needle-angular-add-module JHipster will add new module here

    ],
    declarations: [
        // ExcelComponent,
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        // ExcelService,
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CalimetroAppModule {}
