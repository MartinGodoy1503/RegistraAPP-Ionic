import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthService - Login', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear espía para Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería iniciar sesión con éxito y almacenar el usuario en localStorage', () => {
    const mockUser = { id: 1, username: 'testuser', rol: 'admin', nombre: 'Profesor' };
    
    service.login('testuser', '123456').subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(mockUser));
    });

    const req = httpMock.expectOne('http://localhost:3000/usuarios?username=testuser&password=123456');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]); 

    httpMock.verify();
  });

  it('debería manejar error si las credenciales no son correctas', () => {
    service.login('wronguser', 'wrongpass').subscribe(
      () => fail('La solicitud no debería haber tenido éxito'),
      (error) => {
        expect(error).toBe('Error en la autenticación');
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/usuarios?username=wronguser&password=wrongpass');
    req.flush([], { status: 404, statusText: 'Not Found' });

    httpMock.verify();
  });

  it('debería iniciar sesión con credenciales fijas si no se encuentra usuario en la API', () => {
    const mockUser = { id: '1000', username: 'admin', rol: 'admin', nombre: 'profesor' };

    service.login('admin', 'admin').subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(mockUser));
    });

    const req = httpMock.expectOne('http://localhost:3000/usuarios?username=admin&password=admin');
    req.flush([]); 

    httpMock.verify();
  });

  
  afterEach(() => {
    httpMock.verify();
  });
});

