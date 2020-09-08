import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Utilisateur } from "../interfaces/utilisateur";

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  private userCollection: any;
  private Users: Observable<Utilisateur[]>;

  constructor(public afAuth: AngularFireAuth, afS: AngularFirestore) {
    this.userCollection = afS.collection("Utilisateurs");
    this.Users = this.userCollection.valueChanges().data();
  }

  //! Get User Status
  getUserAuthState() {}

  //! Create User in Firebase Collection
  private addUser(utilisateur: Utilisateur, userId: string) {
    return this.userCollection
      .doc(userId)
      .set(utilisateur)
      .then(() => {
        console.log("User created uid: " + userId);
      });
  }

  //! Create User With Firebase Auth
  addFirebaseUser(utilisateur: Utilisateur) {
    this.afAuth
      .createUserWithEmailAndPassword(utilisateur.email, utilisateur.password)
      .then((userRecord) => {
        this.addUser(utilisateur, userRecord.user.uid);
      });
    //return res ? res.user.uid : null;
  }

  //! Get All Users From The Users Collection
  getAllUsers() {
    console.log(this.Users);
    return this.Users;
  }

  //! User Login
  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log("Nice, it worked! User id" + value.user.uid);
      })
      .catch((err) => {
        console.log("Something went wrong:", err.message);
      });
  }

  //! Get Single User
  getUser(id: string) {
    return this.userCollection.doc(id).get();
  }

  //! Update User In Collection
  updateUser(id: string, utilisateur: Utilisateur) {
    return this.userCollection.doc(id).update(utilisateur);
  }

  //! Delete User From Collection
  deleteUser(id: string) {
    this.userCollection.doc(id).delete();
  }

  //! User Logout
  logout() {
    this.afAuth.signOut();
  }
}
