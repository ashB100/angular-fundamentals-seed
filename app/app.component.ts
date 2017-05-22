import { Component } from '@angular/core';

/* The <router-outlet> is a directive via the router which
 is essentially a placeholder for where our component will
 be injected. When we route to a component, the <router-outlet>
 then tells the component where to go. This is essentially
 where our components will be dynamically created when 
 we change routes. 

 AppComponent is where we add our naviation. We do this
 through something called the routerLink. Its a directive
 provided to us by Angular. You can pass routerLink an
 expression and also use it for databinding.

 Use routerLinkActiveOptions to tell it to do an exact match.
 To use it as a property binding we simply wrap it in a 
 square bracket to property bind to the directive. So Angular 
 will evaluate it to an expression otherwise its passed in
 as a string. By using the routerLinkActiveOptions directive
 I'm telling it to do an exact match and telling it to 
 ignore all inheritted routes, because they kindof all 
 point to "/" at some point. Even something like "/passenger" 
 is of the routerLink active of "/" because it still 
 matches this path. 

 Its not as simple as just doing something like routerLink="item.link"
 The routerLink directive actually allows us to use property binding
 so if we wrap it in sqare braces [routerLink]="item.link", routerLink
 will now be evaluated agains the expression.
 */ 

interface Nav {
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
    <nav class="nav">
      <a 
        *ngFor="let item of nav"
        [routerLink]="item.link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: item.exact }">
        {{ item.name }}
      </a>
    </nav>

      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true
    },
    {
      link: '/passengers',
      name: 'Passengers',
      exact: true
    },
    {
      link: '/oops',
      name: '404',
      exact: false
    }
  ]
}
