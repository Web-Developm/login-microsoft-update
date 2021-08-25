import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/service/data.service';

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


  constructor(private http: HttpClient, private service: DataService) {

  }

  ngOnInit(): void {
    this.profileData();
  }

  callProfile() {
    this.service.call().subscribe(
      data => {
        this.profile = data;
        console.log(data);
      }
    )
  }

  profileData = (): any => {
    debugger;
    this.http.get('https://graph.microsoft.com/v1.0/me').toPromise().then(
      data => {
        this.profile = data;
      }
    ).catch((err) => {
      this.profile = null;
    })
  }

  

}
