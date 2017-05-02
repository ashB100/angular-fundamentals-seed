// import the NgModule
import { NgModule } from "@angular/core";
// CommonModule has the directives like ngIf
import { CommonModule } from '@angular/common';

// Containers
import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";

// Components
import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";
import { PassengerDetailComponent } from "./components/passenger-detail/passenger-detail.component";

// Now we have the @NgModule decorator. Pass in our configuration object.
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
        PassengerDashboardComponent,
        PassengerCountComponent,
        PassengerDetailComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PassengerDashboardComponent
    ]
})

export class PassengerDashboardModule {}