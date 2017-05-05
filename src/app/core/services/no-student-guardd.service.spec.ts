import { TestBed, inject } from '@angular/core/testing';

import { NoStudentGuarddService } from './no-student-guardd.service';

describe('NoStudentGuarddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoStudentGuarddService]
    });
  });

  it('should ...', inject([NoStudentGuarddService], (service: NoStudentGuarddService) => {
    expect(service).toBeTruthy();
  }));
});
