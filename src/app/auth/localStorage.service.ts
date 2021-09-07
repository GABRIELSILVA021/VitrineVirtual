import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() { }
    KEY: string = "USER_INFO";
    setUserInfo(userName: string) {
        var date = new Date();
        let obj: UserObj = {
            date: date,
            user: userName
        }
        localStorage.setItem(this.KEY, JSON.stringify(obj));
    }

    getUserInfo() {
        var obj = localStorage.getItem(this.KEY);
        if(obj){
            return JSON.parse(obj);
        }
        return null;
    }

    removeUserInfo() { 
        localStorage.removeItem(this.KEY);
    }

    validateUserInfo() { 
        var now: Date = new Date();
        var userInfo: UserObj = this.getUserInfo();
        if(userInfo){
            var hours = Math.abs(now.getTime() - new Date(userInfo.date).getTime())/36e5;
            if(hours > 0.5){ //Representa o tanto de horas para ficar logado
                this.removeUserInfo();
                return false;
            }
            return true;
        }
        return false;
    }
}

export type UserObj = {
    date: Date,
    user: string
};
  