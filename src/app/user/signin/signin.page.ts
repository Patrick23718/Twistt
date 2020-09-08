import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UtilisateurService } from "../../services/utilisateur.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  user = {
    email: "",
    password: "",
  };
  errmessage = "";
  connected: boolean;
  constructor(
    public afAuth: AngularFireAuth,
    private _utilisateur: UtilisateurService
  ) {}

  ngOnInit() {
    this.getUserAuthStatus();
  }

  login() {
    this._utilisateur.login(this.user.email, this.user.password);
    //this.getUserAuthStatus();
  }

  getUserAuthStatus() {
    this.afAuth.authState.subscribe((auth) => {
      if (!auth) {
        console.log("non connecté");
        this.connected = false;
      } else {
        console.log("connecté: " + auth.uid + auth.email);
        this.connected = true;
      }
    });
  }

  logout() {
    // this.afAuth.signOut();
    this._utilisateur.logout();
    this.getUserAuthStatus();
  }
  // authState() {}
}
