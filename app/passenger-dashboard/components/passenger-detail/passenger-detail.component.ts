import { Component, Input } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: "passenger-detail",
    template: `
        <div>
            <span class="status"
                [ngStyle]="{
                    'background-color': (detail.checkedIn ? '#2ecc71' : '#c0392b') 
                }"></span>

                <input type="text"
                    [value]="detail.fullname"
                    (input)="onNameChange(name.value)"
                    #name>

                <div>
                    {{ detail.fullname }}
                </div>

            <div class="date">
                Check in date: 
                {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in.'  }}
            </div>
            <div class="children">
                Children: {{ detail.children?.length }}
            </div>
        </div>
    `
})
export class PassengerDetailComponent {
    @Input()
    detail: Passenger;

    constructor() {}

    onNameChange(value: string) {
        console.log("value:", value);
    }
}