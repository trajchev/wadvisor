import { AuthService } from '../../auth/auth.service';

export class AuthServiceMock {

    static instance(): jasmine.SpyObj<AuthService> {
        let instance = jasmine.createSpyObj<AuthService>('AuthService', [
            'getToken',
            'getLevel',
            'getIsAuth',
            'getAuthStatusListener',
            'autoAuthUser',
            'logout',
            'signup',
            'login',
            'forgotPassword',
            'resetPassword',
            'confirmUser',
            'refreshToken'
        ]);

        instance.getToken.and.returnValue('');
        instance.getLevel.and.returnValue('');
        instance.getIsAuth.and.returnValue(true);
        instance.getAuthStatusListener.and.callThrough()
        instance.autoAuthUser.and.callThrough();
        instance.logout.and.returnValue();
        instance.signup.and.callThrough();
        instance.login.and.returnValue();
        instance.forgotPassword.and.callThrough();
        instance.resetPassword.and.callThrough();
        instance.confirmUser.and.callThrough();
        instance.refreshToken.and.callThrough();

        return instance;

    }
}
