import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterService {
  users$ = [
    {
      id: uuidv4(),
      username: 'john.doe',
      password: '12345',
      birthDate: '20/02/1996',
      hash: `${uuidv4()}${uuidv4()}`,
    },
    {
      id: uuidv4(),
      username: 'jane.doe',
      password: '12345',
      birthDate: '23/07/2000',
      hash: `${uuidv4()}${uuidv4()}`,
    },
  ];

  constructor() {}
}
