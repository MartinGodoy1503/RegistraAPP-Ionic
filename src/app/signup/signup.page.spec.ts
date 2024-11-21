import { TestBed } from '@angular/core/testing';
import { SignupPage } from './signup.page'; // Asegúrate de que este sea tu componente
import { DBTaskService } from '../services/dbtask.service'; // Importa tu servicio

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPage],
      providers: [  
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});