import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { UtilisateurService } from "../../services/utilisateur.service";
import { Utilisateur } from "../../interfaces/utilisateur";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  connected: boolean;
  user: Utilisateur = {
    email: "",
    password: "",
    telephone: "",
  };

  allUsers: Observable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public afS: AngularFirestore,
    private _utilisateur: UtilisateurService
  ) {
    this.allUsers = afS.collection("Utilisateurs").valueChanges();
    // this.allUsers = this._utilisateur.getAllUsers();
    console.log(this.allUsers);
  }

  ngOnInit() {
    //console.log(this.allUsers);
  }

  register() {
    this._utilisateur.addFirebaseUser(this.user);
  }
}
