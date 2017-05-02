export interface Child {
  name: string,
  age: number
}

export interface Passenger {
  id: number,
  fullname: string,
  checkedIn: boolean,
  checkInDate?: number | null,  // optional 
  children: Child[] | null      // array of Child or null
}