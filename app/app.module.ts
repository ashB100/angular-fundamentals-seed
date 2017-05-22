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
import { RouterModule, Routes } from '@angular/router';

// Import the component into our module.
// We don't have to put .ts in the end
import { PassengerDashboardModule } from "./passenger-dashboard/passenger-dashboard.module";

import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

import { AppComponent } from './app.component';

/* Tell angular that this AppModule is a NgModule
 The root module which is the first module that instantiates
 the angular app is the only module that contains the
 bootstrap property.
 To actually register this AppComponent in our module,
 we need to create something called declarations.
 So we import, register, bootstrap the AppComponent.

 BrowserModule and CommonModules are typically what you 
 need to import into your base NgModule before you can
 get going. 

 Wildcard routes for 404 handling: 
 { path: **, component: NotFoundComponent }: this basically says
 any routes that doesn't exist on our application we're going
 to use the NotFoundComponent. 

 Implementing redirects: say instead of going to the home 
 component we want to go straight to the passengers. In this case
 what we can implement is something called a redirectTo
*/



const routes: Routes = [
  //{ path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'passengers', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

/* Angular provides us different location strategies. Location
  strategies basically means the url. At the moment we are using
  forRoot. It also accepts different arguments, so what we can 
  do is pass in a property called useHash, e.g:
  RouterModule.forRoot(routes, { useHash: true}) - all this will 
  do is add the hashs to the url. This also supports the old 
  browsers. It uses the History API underneath if you want to use
  the normal routing which is the modern way of doing the routing
  without the hash, however, if you decide to use this your 
  server will have to support this type of location. 

  The benefit of using the normal mode, which is just a forward slash
  "/" is that we can actually server side render. So this is one
  of the benefits of what we call the push location strategy API
  which uses the history.push state, which is an html5 api.
 */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    CommonModule,
    FormsModule,
    //RouterModule.forRoot(routes, { useHash: true }),
    RouterModule.forRoot(routes),
    // Custom modules
    PassengerDashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}