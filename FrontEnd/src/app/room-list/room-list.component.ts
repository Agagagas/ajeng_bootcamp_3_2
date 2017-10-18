import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  roomList : object[] = [{'room_name' : 'Room 1', 'room_class' : 'A', 'price': 100000, 'status' : true},{'room_name' : 'Room 2', 'room_class' : 'B', 'price': 50000, 'status' : true},{'room_name' : '3', 'room_class' : 'A', 'price': 100000, 'status' : true}];;

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get("http://localhost:8000/api/createBooking/")
    .subscribe(
      result => {
        this.roomList = result.json();
      },
      error => {
        console.log('Error !');
      }
    )
  }

  GetRoom() : object[] {
    var istrue : object[] = [];
    for (var i = 0; i < this.roomList.length; i++) {
    var room = this.roomList[i];
    if (room["status"] == true) {
    istrue.push(room);
    }
    }
    return istrue;
    }

  add(index) : void{
    for (var i = 0; i < this.roomList.length; i++) {
      if (this.roomList[i]['room_name'] == index) {
      this.roomList[i]['availability'] = false;
      break;
      }}
  } 

}
