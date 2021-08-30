import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/service/data.service';
import { filter, takeUntil, map } from 'rxjs/operators';


const url = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

export class Str {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
  jobTitle?: string;
  displayName?: string;
  mobilePhone?: string;
  officeLocation?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile!: Str | null;

  store: any;

  image: any;



  constructor(private http: HttpClient, private service: DataService,) {

  }

  ngOnInit(): void {

    this.callProfile();
    this.profile_photo();

  }

  callProfile() {
    this.service.call().subscribe(
      data => {
        this.profile = data;
        console.log(data);
      }
    )
  }

  /*profileData = (): any => {
    debugger;
    this.http.get('https://graph.microsoft.com/v1.0/me').toPromise().then(
      data => {
        this.profile = data;
        console.log(data);
      }
    ).catch((err) => {
      this.profile = null;
    })
  }*/

  /*profile_image = (): any => {
    this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', {responseType:'blob'}).toPromise().then(
      data => {
        console.log(data);
        this.image = data;

        let reader= new FileReader();
        reader.onload=(e)=>{
          this.image=reader.result;
        }

        reader.readAsDataURL(data);
      }
    ).catch(err => {
      console.log(err);
    })
  }*/

  profile_photo() {
    this.service.image().subscribe(
      data => {
        //this.image = data;
        console.log("Image", data);

        let reader = new FileReader();

        reader.onload = (e) => {
          let url = reader.result;
          this.image = reader.result;
        }

        /*reader.addEventListener("load", ()=>{
          this.image=reader.result;
        })*/

        reader.readAsDataURL(data);


      }

    )
  }












}
