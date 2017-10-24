import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
import { ContactUsPage } from '../contact-us/contact-us';
import { AboutPage } from '../about/about';
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
    
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = AboutPage; 
  tab3Root: any = ContactUsPage; 
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
