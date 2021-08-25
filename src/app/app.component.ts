import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'login-microsoft';

  isIFrame = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private guard: MsalGuardConfiguration, private authservice: MsalService, private broadservice: MsalBroadcastService) {

  }

  ngOnInit() {
    this.setLoginDisplay();

    this.broadservice.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })
  }

  setLoginDisplay() {
    this.loginDisplay = this.authservice.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authservice.instance.getActiveAccount();

    if (!activeAccount && this.authservice.instance.getAllAccounts().length > 0) {
      let accounts = this.authservice.instance.getAllAccounts();
      this.authservice.instance.setActiveAccount(accounts[0]);
    }
  }

  loginPopup() {
    debugger;
    if (this.guard.authRequest) {
      this.authservice.loginPopup({ ...this.guard.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authservice.instance.setActiveAccount(response.account);
        });
    }
    else {
      this.authservice.loginPopup().subscribe((response: AuthenticationResult) => {
        this.authservice.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    debugger;
    if (popup) {
      this.authservice.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    }

    else {
      this.authservice.logoutPopup();
    }
  }


  ngOnDestroy() {
    debugger;
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
