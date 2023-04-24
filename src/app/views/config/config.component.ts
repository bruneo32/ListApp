import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfig, defaultAppConfig } from 'src/app/models/AppConfig';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @Input() appVersion: string = "-";
  @Input() config: AppConfig;
  @Output() valueChange = new EventEmitter<AppConfig>();
  @Output() SetTheme_ = new EventEmitter<string>();

  ReleasesURL: string = "https://github.com/bruneo32/ListApp/releases";

  constructor() {
    this.config = defaultAppConfig;
  }

  ngOnInit(): void { }

  update() {
    this.valueChange.emit(this.config);
  }

  resetData() {
    if (confirm("Are you sure?")) {
      localStorage.clear();
      window.location.reload();
    }
  }

  SetTheme(themename: string) {
    this.SetTheme_.emit(themename);
  }

}
