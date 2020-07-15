// import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { HomeModel } from 'src/app/models/home.model';
// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ HomeComponent ],
//       imports: [HttpClientTestingModule],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create HomeComponent', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have stats', fakeAsync(() => {
//       tick();
//       fixture.detectChanges();
//     expect(component.stats).toBeDefined();
//   }));

//   it('should get the stats from the Home.Service service', fakeAsync(() => {
//     tick();
//     fixture.detectChanges();
//     expect(component.stats).toBeTruthy();
//     expect(component.stats.bookmakers).toBeDefined();
//     expect(component.stats.sports).toBeDefined();
//     expect(component.stats.teams).toBeDefined();
//   }));

//   it('should render catchphrase in h1', fakeAsync(() => {
//     tick();
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Do You Want To Be A Winner?');
//   }));

//   it('should render 4 h6 tags with app stats', fakeAsync(() => {
//     tick();
//     fixture.detectChanges();
//     expect(fixture.nativeElement.querySelectorAll('h6').length).toBe(5);
//     expect(fixture.nativeElement.querySelectorAll('h6')[0].textContent).toContain('Leagues');
//     expect(fixture.nativeElement.querySelectorAll('h6')[1].textContent).toContain('Weekly Matches');
//     expect(fixture.nativeElement.querySelectorAll('h6')[2].textContent).toContain('Advising Sites');
//     expect(fixture.nativeElement.querySelectorAll('h6')[3].textContent).toContain('Question');
//     expect(fixture.nativeElement.querySelectorAll('h6')[4].textContent).toContain('Already a winner?');
//   }));
// });
