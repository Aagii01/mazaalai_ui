import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrackCodeComponent } from './create-track-code.component';

describe('CreateTrackCodeComponent', () => {
  let component: CreateTrackCodeComponent;
  let fixture: ComponentFixture<CreateTrackCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrackCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrackCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
