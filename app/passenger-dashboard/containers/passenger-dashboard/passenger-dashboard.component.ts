import { Component, OnInit } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
@Component({
    selector: "passenger-dashboard",
    styleUrls: ["passenger-dashboard.component.scss"], // styles are encapsulated to a component
    template: `
        <div>
            <passenger-count></passenger-count>
            
            <passenger-detail></passenger-detail>

            <h3>Airline Passengers</h3>
            <ul>
                <li *ngFor="let passenger of passengers; let i = index">
                    <span class="status"
                        [ngStyle]="{
                            'background-color': (passenger.checkedIn ? '#2ecc71' : '#c0392b') 
                        }"></span>
                    {{ i }}: {{ passenger.fullname }}

                    <div class="date">
                        Check in date: 
                        {{ passenger.checkInDate ? (passenger.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in.'  }}
                    </div>
                    <div class="children">
                        Children: {{ passenger.children?.length }}
                    </div>
                </li>
            </ul>
        </div>
    `
})
export class PassengerDashboardComponent implements OnInit {
    passengers: Passenger[];

    constructor() {

    }

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
};