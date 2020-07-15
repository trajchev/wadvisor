import { AuthResponseData } from '../../models/auth.model';
import { role } from '../../models/role.model';

export class RegisterResponseDataMock {

    static init(): AuthResponseData {
        return {
          "status": "success",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImV4cCI6MTU5NDc0MDQ0MTA3NjM2MDAsImlhdCI6MTU5NDc0MDQ0MX0.p6qbh1RCWzuRfINIFr4QcPVrI3Ty_lea_628WvI2hbY",
          "expiresIn": 3600000,
          "level": role.Unconfirmed
        }
    }

}
