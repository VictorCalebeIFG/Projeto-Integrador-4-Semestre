import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagemComponent } from './upload-imagem.component';

describe('UploadImagemComponent', () => {
  let component: UploadImagemComponent;
  let fixture: ComponentFixture<UploadImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
