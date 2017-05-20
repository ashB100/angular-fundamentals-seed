import { Component, Input } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

// <form #form="ngForm" exports ngForm which is an Angular directive
// which keeps track of all the state changes and all the validations
// of our inputs inside our form.
// We add novalidate to tell the form not to validate it because we want
// Angulars built in validation

// Because its a template driven form, each input needs to have a 
// name. And the name that you create will actually create a property
// on the form for you as an object. 

// Adding ngModel to the input. It's a directive which is a directive
// from Angular. ngModel synchronises the form values for you. 

// Because we're using template driven data, template is the source 
// of truth. Ideally, all the properties we want to create need to be
// bound to some form of input and registered inside the form to be 
// picked up via Angular. 

// [ngModel]="detail.fullname" takes the detail object and creates a 
// one-way binding from the ngModel. At runtime we can use our ngModel
// however we're using detail.fullname to populate it with an initial
// value. Because this is an asynchronous call, detail.fullname may not
// be available. Use the safe navigation operator, so when the value
// becomes available its going to onw-way bind to the ngModel. 

// When we change the passenger name value through the form input, the 
// reference value which has been passed down in detail.fullname will not
// change. 

// If we check the passenger out with the radio input it will set the
// checkedIn value to null because the ngIf will completely destroy this
// dom node so that it will no longer exist in the actual form so our
// ngModel won't exist however, if we check them back in it will 
// recreate this dom node and whet it does is it will then create this
// toggleCheckIn which then creates a timestamp for when the passenger
// is checked in.  
@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
         <form #form="ngForm" novalidate>

         {{ detail | json }}

            <div>
                Passenger name; 
                <input type="text"
                    name="fullname"
                    [ngModel]="detail?.fullname">
            </div>

            <div>
                Passenger ID; 
                <input type="number"
                    name="id"
                    [ngModel]="detail?.id">
            </div>

            <div>
                <!--label>
                    <input type="radio"
                    [value]="true"
                    name="checkedIn"
                    [ngModel]="detail?.checkedIn"
                    (ngModelChange)="toggleCheckIn($event)">
                Yes
                </label>
                <label>
                    <input type="radio"
                    [value]="false"
                    name="checkedIn"
                    [ngModel]="detail?.checkedIn"
                    (ngModelChange)="toggleCheckIn($event)">
                No
                </label-->

                <label>
                    <input type="checkbox"
                    name="checkedIn"
                    [ngModel]="detail?.checkedIn"
                    (ngModelChange)="toggleCheckIn($event)">
                    Checked in: 
                </label>
            </div>

            <div>
                Luggage:
                <select
                    name="baggage"
                    [ngModel]="detail?.baggage">
                    <option
                        *ngFor="let item of baggage"
                        [value]="item.key"
                        [selected]="item.key === detail?.baggage">
                            {{ item.value }}
                    </option>
                </select>
            </div>

            <div *ngIf="form.value.checkedIn">
                Check in date:
                <input type="number"
                    name="checkInDate"
                    [ngModel]="detail?.checkInDate">
            </div>
            
            {{ form.value | json }}

         </form>
    `
})
export class PassengerFormComponent {
    @Input()
    detail: Passenger;

    baggage: Baggage[] = [{
        key: 'none',
        value: 'No baggage'
    }, {
        key: 'hand-only',
        value: 'Hand baggage'
    }, {
        key: 'hold-only',
        value: 'Hold baggage'
    }, {
        key: 'hand-hold',
        value: 'Hand and hold baggage'
    }];

    toggleCheckIn(checkedIn: boolean) {
        if (checkedIn) {
            this.detail.checkInDate = Date.now(); 
        }
    }

}