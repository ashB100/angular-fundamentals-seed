import { Component, Input, Output, EventEmitter } from '@angular/core';

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

/* When we want to implement validation, we can actually
use template references on the elements themselves.

What can we export, much like the ngForm, we can export
ngModel. ngModel does so much more underneath then the
simple value binding, it actually tracks validation
states for us.  

<button type="submit">Update</button> : we don't need to bind
and event such as a (click) because of the way that forms work
If it is a type of submit it will then bubble a submit event up
to the actual form where the submit event fires. 

To submit our form create a (ngSubmit) event:
<form (ngSubmit)="handleSubmit(form.value", form.valid)" #form="ngForm" 
You could pass the whole form if you wanted to. You can use (submit)
but (ngSubmit) is preferred. ngSubmit does some extra stuff for
you such as telling the ngForm underneath that the form has 
been submitted. We pass the form. Because its a template driven
form, the form is the guider of the model. 

This is a stateless component because we have an input called
detail, it gets passed the Passenger we bind it to the form. 
So on submit we don't really want to talk to an api because 
this is in our components folder and it shouldn't really
communicate with an API. So what we really want to do is 
create an output. 

As soon as the form has been submitted we're gonna make that 
isValid check, if its valid we're going to make
an emit call and update the parent. This is then going
to get picked up by the onUpdatePassenger in the 
passenger-viewer.component (ie, the parent container)

Now, we've seen how to create a submit event and then 
pass the event back up to our container component which
then communicates to the service and updates the backend
API.
*/

@Component({
    selector: 'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
         <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

            <div>
                Passenger name
                <input type="text"
                    name="fullname"
                    required
                    #fullname="ngModel"
                    [ngModel]="detail?.fullname">
            </div>

            <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
                Passenger name is required
            </div>

            <div>
                Passenger ID
                <input type="number"
                    name="id"
                    required
                    #id="ngModel"
                    [ngModel]="detail?.id">
            </div>

            <div *ngIf="id.errors?.required && id.dirty" class="error">
                Passenger ID is required
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

                <!--select
                    name="baggage"
                    [ngModel]="detail?.baggage">
                    <option
                        *ngFor="let item of baggage"
                        [ngValue]="item.key">
                            {{ item.value }}
                    </option>
                </select-->
            </div>

            <div *ngIf="form.value.checkedIn">
                Check in date:
                <input type="number"
                    name="checkInDate"
                    [ngModel]="detail?.checkInDate">
            </div>
            
            <!--div>{{ form.value | json }}</div>
            <div>Valid: {{ form.valid | json }}</div>
            <div>Invalid: {{ form.invalid | json }}</div-->

            <button type="submit" [disabled]="form.invalid">
                Update Passenger
            </button>
         </form>
    `
})
export class PassengerFormComponent {
    @Input()
    detail: Passenger;

    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

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

    handleSubmit(passenger: Passenger, isValid: boolean) {
        if (isValid) {
            this.update.emit(passenger);
        }
    }

}