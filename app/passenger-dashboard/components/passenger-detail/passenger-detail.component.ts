import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from "@angular/core";

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
            
            <button (click)=toggleEdit()>
                {{editing ? 'Done' : 'Edit'}}
            </button>

            <button (click)=onRemove()>
                Remove
            </button>

            <button (click)="goToPassenger()">
                View
            </button>
        </div>
    `
})
export class PassengerDetailComponent implements OnChanges, OnInit {
    @Input()
    detail: Passenger;

    /* We are actually emitting this.detail so what we are emitting
    are infact Passenger objects. 
    */
    @Output()
    edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
    remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    @Output()
    view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    editing: boolean = false;
    
    constructor() {}

    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue);
        }
    }

    ngOnInit() {
        console.log('ngOnInit');
    }
    
    onNameChange(value: string) {
        // Update the local state of this component
        // As the elements (input and div) are in an *ngIf 
        // expression they will get destroyed and recreated each 
        // time the toggle happens.
        this.detail.fullname = value;
    }

    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }

        this.editing = !this.editing;
    }

    onRemove() {
        this.remove.emit(this.detail);
    }

    goToPassenger() {
        this.view.emit(this.detail);
    }
}