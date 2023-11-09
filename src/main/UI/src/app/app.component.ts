import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

        //API module
        constructor(private httpClient: HttpClient) {
        }

        //API address
        private baseURL: string = 'http://localhost:8080';

        // API address for GET and POST
        private getUrl: string = this.baseURL + '/room/reservation/v1/';
        private postUrl: string = this.baseURL + '/room/reservation/v1';

        public submitted!: boolean;

        roomsearch!: FormGroup;
        rooms!: Room[];
        request!: ReserveRoomRequest;
        currentCheckInVal!: string;
        currentCheckOutVal!: string;

        //Front page greeting
        public greeting: string = "Greeting in French";
        public greeting2: string = "Greeting in English!"
        public timeET: string = "Eastern Time";
        public timeMT: string = "Mountain Time";
        public timeUTC: string = "Univeral Time";





        //On load...
        ngOnInit() {
            this.roomsearch = new FormGroup({
              checkin: new FormControl(' '),
              checkout: new FormControl(' ')
            });

            // this.rooms=ROOMS;
            const roomsearchValueChanges$ = this.roomsearch.valueChanges;

            // subscribe to the stream
            roomsearchValueChanges$.subscribe(x => {
              this.currentCheckInVal = x.checkin;
              this.currentCheckOutVal = x.checkout;
            });


            this.getWelcomeMessage().subscribe(
              (data: string) => {
                var thing=data;

                // @ts-ignore
                this.greeting = thing["message"];
                // @ts-ignore
                console.log(thing);
              },
              (error) => {
                console.error('An error occurred:', error);
              }
            );

            this.getWelcomeMessage2().subscribe(
              (data: string) => {
                var thing=data;

                // @ts-ignore
                 this.greeting2 = thing["message"];
                // @ts-ignore
                console.log(thing);
              },
              (error) => {
                console.error('An error occurred:', error);
              }
            );
            this.getTime().subscribe(
              (data: String) => {
                var object=data;

                // @ts-ignore
                this.timeET = object["ET"] + " ET";
                // @ts-ignore
                this.timeMT = object["MT"] + " MT";
                // @ts-ignore
                this.timeUTC = object["UTC"] + " UTC";

                // @ts-ignore
                console.log(this.time);
              },
              (error) => {
                console.error('An error occurred:', error);
              }
            );
        }

        //call API for welcome message
        getWelcomeMessage(): Observable<string> {
          return this.httpClient.get<string>(this.baseURL + '/api/getBundleCA/', {responseType: 'json'});

        }
        getWelcomeMessage2(): Observable<string> {
          return this.httpClient.get<string>(this.baseURL + '/api/getBundleUS/', {responseType: 'json'});

        }
        getTime(): Observable<string> {
          return this.httpClient.get<string>(this.baseURL + '/api/time/', {responseType: 'json'});

        }


      //-------------------------------------------------------------------------------------------------------


        // On submit (HTML) to search for dates, call API. Doesn't return anything
        onSubmit({value, valid}: { value: Roomsearch, valid: boolean }) {
            this.getAll().subscribe(
              rooms => {
                console.log(Object.values(rooms)[0]);
                this.rooms = <Room[]>
                  Object.values(rooms)[0];
                for(var i of this.rooms){
                  let sub:number = parseInt(i.price);

                  let subCAD = (sub*1.37).toFixed();
                  let subEUR = (sub*.934).toFixed();

                  i.priceCAD = subCAD.toString();
                  i.priceEUR = subEUR.toString();
                }
              }
            );
        }



        // Get all information from API, called by onSubmit() above
        getAll(): Observable<any> {
            return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, {responseType: 'json'});
        }




        //-------------------------------------------------------------------------------------------------------


        // reserve Room only after onSubmit()
        reserveRoom(value: string) {
            this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

            this.createReservation(this.request);
        }


        //called by reserveRoom() above to complete reservation via POST
        createReservation(body: ReserveRoomRequest) {
            let bodyString = JSON.stringify(body); // Stringify payload
            let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
            // let options = new RequestOptions({headers: headers}); // Create a request option

            const options = {
              headers: new HttpHeaders().append('key', 'value'),
            }

            this.httpClient.post(this.postUrl, body, options)
              .subscribe(res => console.log(res));
        }
}



  /*mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }*/




export interface Roomsearch{
    checkin:string;
    checkout:string;
}





export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  priceCAD: string;
  priceEUR: string;
  links:string;
}






export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }

}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */

