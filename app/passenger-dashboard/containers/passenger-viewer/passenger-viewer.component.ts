import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

// PassengerViewerComponent is a container/statefull component
// It will provide data for its stateless components

@Component({
    selector: 'passenger-viewer',
    styleUrls: [ 'passenger-viewer.component.scss'],
    templateUrl: `
        <div>
            <passenger-form
                [detail]="passenger">
            </passenger-form>
        </div>
    `
})
export class PassengerViewerComponent implements OnInit {
    passenger: Passenger;

    constructor(private passengerService: PassengerDashboardService) {

    }

    ngOnInit() {
        this.passengerService
            .getPassenger(1)
            .subscribe((data: Passenger) => this.passenger = data);
    }
}