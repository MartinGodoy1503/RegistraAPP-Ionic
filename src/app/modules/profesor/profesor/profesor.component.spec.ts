import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { ProfesorComponent } from './profesor.component';
import { AuthService } from '../../../services/auth.service'; 
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfesorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule, 
      ],
      declarations: [ProfesorComponent],
      providers: [AuthService], 
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProfesorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
