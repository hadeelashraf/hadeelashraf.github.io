import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // REST API
    endpoint = 'http://localhost:3000/users';
    
    constructor(private httpClient: HttpClient) { }
    
    httpHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    login(email: string, password: string) : Observable<User[]>{ 
        return this.httpClient
            .get<User[]>(`${this.endpoint}?email=${email}&password=${password}&_limit=1`);
    }

    register(data: User) : boolean {
        this.httpClient
            .post<User>(this.endpoint, data, this.httpHeader)
            .subscribe((result: any) => {
                this.addUserToStorage(result);
            }, 
            () => { return false; }
        );
        return false;
    }  

    isAuthenticated(){
        return localStorage.getItem('user') !== null;
    }

    addUserToStorage(result: any){
        if(result){
            localStorage.setItem('user', JSON.stringify(result)) 
            window.location.reload();
            return true; 
        }else{
            return false;
        }
    }

    getUserId(){
        if(this.isAuthenticated()){
            return JSON.parse(localStorage.getItem('user') as string).id;
        }else{
            return null;
        }
    }

    logout(){
        localStorage.clear();
        window.location.reload();
    }
}