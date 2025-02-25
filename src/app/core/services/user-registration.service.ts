import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UserDto} from '../models/user/user-dto';
import {UserModel} from '../models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService extends ApiService {

  constructor() {
    super('user')
  }

  createUser(userDto: UserDto) {
    return this.post<UserModel>(userDto, 'create');
  }


}
