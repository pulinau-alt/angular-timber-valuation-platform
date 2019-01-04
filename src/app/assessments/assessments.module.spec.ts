import { AssessmentsModule } from './assessments.module';

describe('AssessmentsModule', () => {
  let assessmentsModule: AssessmentsModule;

  beforeEach(() => {
    assessmentsModule = new AssessmentsModule();
  });

  it('should create an instance', () => {
    expect(assessmentsModule).toBeTruthy();
  });
});
