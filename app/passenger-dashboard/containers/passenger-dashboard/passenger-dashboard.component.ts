import { Component, OnInit } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
@Component({
    selector: "passenger-dashboard",
    styleUrls: ["passenger-dashboard.component.scss"], // styles are encapsulated to a component
    template: `
        <div>
            <passenger-count [items]="passengers">
            </passenger-count>
            //<ng-content select=".count"></ng-content>
            
            <passenger-detail
                *ngFor="let passenger of passengers;"
                [detail]="passenger"
                (remove)="handleRemove($event)">
            </passenger-detail>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];

    constructor() {}

    ngOnInit() {
        console.log("ngOnInit");

        this.passengers = [{
            id: 1,
            fullname: 'Stephen',
            checkedIn: true,
            checkInDate: 1490742000000,
            children: null
            }, {
            id: 2,
            fullname: 'Rose',
            checkedIn: false,
            checkInDate: null,
            children: [{name: 'Emma', age: 10}]
            }, {
            id: 3,
            fullname: 'James',
            checkedIn: true,
            checkInDate: 1490742000000,
            children: [{ name: 'Ted', age: 12}, { name: 'Chloe', age: 7}]
        }];
    }

    handleRemove(event) {
        console.log(event);
    }
};