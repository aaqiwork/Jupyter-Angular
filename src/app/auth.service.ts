
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    token: string;
    constructor(private router: Router) { }
    signupUser(email: string, password: string) {
        console.log(email, password);

        console.log('succesfully registered');
        this.router.navigate(['/login']);
    }
    signinUser(email: string, password: string) {
        console.log('it reached service');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token

                        );
                    if (email === 'admin@gmail.com') {
                        this.router.navigate(['/admin']);
                        const user = firebase.auth().currentUser;

                        if (user != null) {
                            user.providerData.forEach(function (profile) {
                                console.log('Sign-in provider: ' + profile.providerId);
                                console.log('  Provider-specific UID: ' + profile.uid);
                                console.log('  Name: ' + profile.displayName);
                                console.log('  Email: ' + profile.email);
                                console.log('  Photo URL: ' + profile.photoURL);
                            });
                        }
                    } else {
                        this.router.navigate(['/']);
                        console.log(this.token);
                    }
                }
            )
            .catch(
                error => console.log(error)
            );
    }
    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
    isUser() {

        if (firebase.auth().currentUser.email === 'admin@gmail.com ') {
            return 1;
        } else {
            return 0;
        }

    }
    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/']);
    }
}
