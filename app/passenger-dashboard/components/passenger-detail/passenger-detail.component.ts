import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";

@Component({
    selector: "passenger-detail",
    template: `
        <div>
            <span class="status"
                [ngStyle]="{
                    'background-color': (detail.checkedIn ? '#2ecc71' : '#c0392b') 
                }"></span>

                <div *ngIf="editing">
                    <input type="text"
                        [value]="detail.fullname"
                        (input)="onNameChange(name.value)"
                        #name>
                </div>

                <div *ngIf="!editing">
                    {{ detail.fullname }}
                </div>

            <div class="date">
                Check in date: 
                {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in.'  }}
            </div>
            
            <div class="children">
                Children: {{ detail.children?.length }}
            </div>
            
            <button (click)=toggleEdit()>
                {{editing ? 'Done' : 'Edit'}}
            </button>

            <button (click)=onRemove()>
                Remove
            </button>
        </div>
    `
})
export class PassengerDetailComponent {
    @Input()
    detail: Passenger;

    @Output()
    remove: EventEmitter<any> = new EventEmitter();

    editing: boolean = false;
    constructor() {}

    onNameChange(value: string) {
        // Update the local state of this component
        // As the elements (input and div) are in an *ngIf 
        // expression they will get destroyed and recreated each 
        // time the toggle happens.
        this.detail.fullname = value;
    }

    toggleEdit() {
        this.editing = !this.editing;
    }

    onRemove() {

    }
}