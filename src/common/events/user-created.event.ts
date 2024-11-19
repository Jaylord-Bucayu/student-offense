export class UserCreateEvent {
    constructor(public readonly userId: string, public readonly email:string){}
    
}