import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Loc8rDataService } from '../loc8r-data.service';
import { Location } from '../location';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor(private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
    ) { }

  newLocation: Location;


  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('locationid');
        console.log('ID', id);
        return this.loc8rDataService.getLocationById(id);
      })
    )
    .subscribe((newLocation: Location) => {
      this.newLocation = newLocation;
      this.pageContent.header.title = newLocation.name;
      this.pageContent.sidebar = `${newLocation.name} is on Loc8r because it has accessible wifi and space to sit down with you laptop and get some work done.\n\nIf you\'ve been, please leave a review to help out other users!`;
    });
  }


  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };

}
