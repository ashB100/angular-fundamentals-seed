import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'; // CommonModule has the directives like ngIf
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Containers
import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";
import { PassengerViewerComponent } from "./containers/passenger-viewer/passenger-viewer.component";
// Components
import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";
import { PassengerDetailComponent } from "./components/passenger-detail/passenger-detail.component";
import { PassengerFormComponent } from "./components/passenger-form/passenger-form.component";

// service
import { PassengerDashboardService } from './passenger-dashboard.service';

// We have the @NgModule decorator. Pass in our configuration object.
// Declarations: holds all of the components relative to this module.
// Once we start building our components, all of our components will
// be added to our declarations.
// Imports: lists all the modules our module will use:
// Notice, we're only exporting the PassengerDashboardComponent
// and not the children PassengerCountComponent and PassengerDetail
// component, because in the root app component we're only using the 
// parent PassengerDashboardComponent.
@NgModule({
    declarations: [
        // containers
        PassengerDashboardComponent,
        PassengerViewerComponent,
        // components - we don't need to export these as these are child
        // components of our exported container component
        PassengerCountComponent,
        PassengerDetailComponent,
        PassengerFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,  // We're saying our ngModule is importing HttpModule because we need it for our service.
        FormsModule
    ],
    exports: [
        PassengerViewerComponent
    ],
    providers: [
        PassengerDashboardService
    ]
})

export class PassengerDashboardModule {}