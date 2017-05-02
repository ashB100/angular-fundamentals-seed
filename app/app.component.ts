import { Component } from '@angular/core';

interface Child {
  name: string,
  age: number
}

interface Passenger {
  id: number,
  fullname: string,
  checkedIn: boolean,
  checkInDate?: number | null,  // optional 
  children: Child[] | null      // array of Child or null
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <passenger-dashboard></passenger-dashboard>
    </div>
  `
  //templateUrl: './app.component.html'
})
export class AppComponent {
    name: string = "Todd";
    name2: string = "";
    passengers: Passenger[] = [{
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


    handleChange(value: string) {
      this.name = value;
    }

    handleClickTemplateRef(value: string) {
      console.log("Template ref username value", value);
    }

    handleChangeNoDataBinding(value: string) {
      this.name2 = value;
    }
}
