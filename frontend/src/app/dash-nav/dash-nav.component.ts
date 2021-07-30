import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current');
    console.log(localStorage.removeItem('token'));
    this.router.navigate(['']);
  }
}
