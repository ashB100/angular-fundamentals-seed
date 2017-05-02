// Create a module by importing NgModule from @angular.core
// All a module is is a container that contains all of our 
// components and any dependencies that we need such as 
// services for http requests they all go inside a specific
// module.
// Angular is split up in multiple modules, so each piece of 
// Angular such as the forms or http lives inside a different
// module. The NgModule and the Component decorators live inside
// the .core module.
// Because we're building a browser applicaiton, we want to 
// import the BrowserModule.
// We also need the CommonModule which has the common directives we need.
// FormsModule will allow us to do two way data binding.
// (You can do one way data binding and two way data binding. 
// Two-way data binding might be ok if you've got a local component
// however, whey you want to emit a change you should always 
// use one-way data flow and emit that change with an event listener  ) 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the component into our module.
// We don't have to put .ts in the end
import { PassengerDashboardModule } from "./passenger-dashboard/passenger-dashboard.module";

import { AppComponent } from './app.component';

// Tell angular that this AppModule is a NgModule
// The root module which is the first module that instantiates
// the angular app is the only module that contains the
// bootstrap property.
// To actually register this AppComponent in our module,
// we need to create something called declarations.
// So we import, register, bootstrap the AppComponent.

// BrowserModule and CommonModules are typically what you 
// need to import into your base NgModule before you can
// get going.
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    CommonModule,
    FormsModule,
    // Custom modules
    PassengerDashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}