// Import our app module.
// Tell Angular how to bootstrap it.
// There are specific ways the we can bootstrap an 
// Angular application, such as:
// * on the server,
// * on the client,
// * or we can precompile it.

// If we want to compile in the browser we have to use
// something called platformBrowserDynamic. This actually
// contains the client side code that actually processes
// our templates, all of our bindings and allows us to
// do dependency injection. So we need the platformBrowserDynamic
// instead of platformBrowser like we did in the app module because we need 
// the dynamic version which allows us to compile our app in the browser. 

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);