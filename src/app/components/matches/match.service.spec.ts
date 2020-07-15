// import { TestBed, async } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
// import { MatchService } from './match.service';
// import { MatchModel } from 'src/app/models/match.model';
// import { environment } from 'src/environments/environment';

// describe('Match Service tests', () => {

//     let matchService: MatchService;
//     let httpTestingCtrl: HttpTestingController;
//     let testMatches: MatchModel[] = [
//         {
//             "id": 1,
//             "home_team": "Arsenal",
//             "away_team": "Everton",
//             "commence_time": "1576931400",
//             "sport_key": "soccer_epl",
//             "createdAt": "2020-06-24T19:24:11.000Z",
//             "updatedAt": "2020-06-24T19:24:11.000Z",
//             "sportKey": "soccer_epl"
//         },
//         {
//             "id": 2,
//             "home_team": "Brighton and Hove Albion",
//             "away_team": "Crystal Palace",
//             "commence_time": "1576525500",
//             "sport_key": "soccer_epl",
//             "createdAt": "2020-06-24T19:24:11.000Z",
//             "updatedAt": "2020-06-24T19:24:11.000Z",
//             "sportKey": "soccer_epl"
//         },
//         {
//             "id": 3,
//             "home_team": "Crystal Palace",
//             "away_team": "Newcastle United",
//             "commence_time": "1576940400",
//             "sport_key": "soccer_epl",
//             "createdAt": "2020-06-24T19:24:11.000Z",
//             "updatedAt": "2020-06-24T19:24:11.000Z",
//             "sportKey": "soccer_epl"
//         },
//         {
//             "id": 4,
//             "home_team": "Aston Villa",
//             "away_team": "Southampton",
//             "commence_time": "1576940400",
//             "sport_key": "soccer_epl",
//             "createdAt": "2020-06-24T19:24:11.000Z",
//             "updatedAt": "2020-06-24T19:24:11.000Z",
//             "sportKey": "soccer_epl"
//         },
//     ]

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule],
//             providers: [MatchService]
//         });

//         matchService = TestBed.get(MatchService);
//         httpTestingCtrl = TestBed.get(HttpClientTestingModule);
//     });

//     it('should get all matches from league', ()=> {
//         matchService.getMatches('soccer_epl')
//         .subscribe((data: MatchModel[]) => {
//             expect(data.length).toBe(4);
//         })

//         let matchRequest: TestRequest = httpTestingCtrl.expectOne(`${environment.ENDPOINT_API}matches/soccer_epl`);
//         expect(matchRequest.request.method).toEqual('GET');
//         matchRequest.flush(testMatches);

//     });

// });
