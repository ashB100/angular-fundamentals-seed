import { Component, OnInit } from '@angular/core';
// Because its a smart component or a container component
// we can import these here.
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

// PassengerViewerComponent is a container/statefull component
// It will provide data for its stateless components

@Component({
    selector: 'passenger-viewer',
    styleUrls: [ 'passenger-viewer.component.scss'],
    templateUrl: `
        <div>
            <button (click)="goBack()">
                &lsaquo; Go back
            </button>
            
            <passenger-form
                [detail]="passenger"
                (update)="onUpdatePassenger($event)">
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    public passenger: Passenger;

    /* We can subscribe to the changes of the route and we
    can read the routeParams that come back and pass them
    dynamically into our service. 
    */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private passengerService: PassengerDashboardService
    
    ) {}

    ngOnInit() {
        /* We have this.route.params, then we're getting the route data, you can imagine
        that this is the params passed to us but we're saying that its going to be 
        somewhat of type passenger. The data that we're getting has the id property 
        that we're going to pass into getPassenger. The switchMap will actually change
        the subscription from observing changes from the url and return a new observable
        and we get the result of the new observable in the subscribe. */
        this.route.params
            .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
            .subscribe((data: Passenger) => this.passenger = data);
    }

    onUpdatePassenger(event: Passenger) {
        this.passengerService
            .updatePassenger(event)
            .subscribe((data: Passenger) => {
                this.passenger = Object.assign({}, this.passenger, event);
            });
    }

    /* Implement what is called imperative routing 
    This is called imperative routing because we are using the 
    native API rather than something like the router link which 
    we looked at previously. By using this.router.navigate we are
    telling the component class itself to actually use the router.
    We'll add a Go back button for this.  
    */
    goBack() {
        this.router.navigate(['/passengers']);
    }
}