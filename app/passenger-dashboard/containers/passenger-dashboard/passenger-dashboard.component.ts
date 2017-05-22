import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from "../../models/passenger.interface";
@Component({
    selector: "passenger-dashboard",
    styleUrls: ["passenger-dashboard.component.scss"], // styles are encapsulated to a component
    template: `
        <div>
            <passenger-count [items]="passengers">
            </passenger-count>
            
            <!-- when you edit passenger fullname in the local component: passenger-detail
            you will see the changes in passenger.fullname here. All the 
            changes are instantly been reflected. This is not strictly abiding
            by the rules of one-way data flow. The component should have its 
            own local state and when we click done, we should then update the
            parent data. This is where we can introduce something called ngOnChanges-->
            <div *ngFor="let passenger of passengers;">
                {{ passenger.fullname }}
            </div>

            <passenger-detail
                *ngFor="let passenger of passengers;"
                [detail]="passenger"
                (view)="handleView($event)"
                (edit)="handleEdit($event)"
                (remove)="handleRemove($event)">
            </passenger-detail>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];

    /* constructor(private passengerService: PassengerDashboardService) {}

    This will allow us to inject the dependency into PassengerDashboardComponent
     and tell TypeScript that its a private method so we shouldn't be calling
     it publicly. 
     
     The interesting piece is how Angular looks up tokens. We need to 
     tell Angular what this passengerService is going to be. We've exported
     a member called PassengerDashboardService in our app so what we need to do 
     is import it into this component. Now we have a reference to
     this particular service in our component, then we register it 
     in the constructor.
     
     What Angular will do is use this token to  bind it automatically
     for you to an internal property called passengerService.

     Essentially all its doing is:

     constructor(private passengerService: PassengerDashboardService) {
         this.passengerService = passengerService;
     }
    */
    constructor(
        private router: Router,
        private passengerService: PassengerDashboardService
    ) {}

    // We want to get the data when the component is ready onInit
    ngOnInit() {
        // This is what we call a synchronous call. This has 
        // synchronously been bound to this.passengers. 
        // this.passengers = this.passengerService.getPassengers();

        this.passengerService
            .getPassengers()
            .subscribe((data: Passenger[]) => {
                this.passengers = data;
            }, 
            (error) => {
                console.log('error', error);
            });
    }

    handleEdit(event: Passenger) {
        this.passengerService
            .updatePassenger(event)
            .subscribe((data: Passenger) => {
                this.passengers = this.passengers
                .map((passenger: Passenger) => {
                    if (passenger.id === event.id) {
                        passenger = Object.assign({}, passenger, event);
                    }

                    return passenger;
                });
            });
    }

    handleRemove(event: Passenger) {
        this.passengerService
            .removePassenger(event)
            .subscribe((data: Passenger) => {
                this.passengers = this.passengers.filter((passenger: Passenger) => {
                    return passenger.id != event.id;
                });
            });
    }

    /* We are going to use dynamic imperative routing to allow us
    to route to particular passengers based on their id.
    We need to inject our router in the constructor for allow us
    to do this. 
    */
    handleView(event: Passenger) {
        this.router.navigate(['/passengers', event.id]);
    }
};