import { Component } from '@angular/core';
import { AppConfig, defaultAppConfig } from './models/AppConfig';

const Android: any = (<any>window).Android;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  appVersion: string = "1.1";

  lang: string;
  config: AppConfig;
  lists: Record<string, string[]>
  keys: string[];
  view: string;

  constructor() {
    this.lang = "en-US";
    this.config = defaultAppConfig;
    this.lists = {};
    this.keys = [];
    this.view = "";

    // Prevent go back
    history.pushState(null, document.title, location.href);
    history.back();
    history.forward();
    window.onpopstate = () => {
      history.go(1);
      this.view = "";
    };
  }

  ngOnInit() {
    try {
      this.lang = Android?.getLocale() ?? "en_US";

      this.lists = JSON.parse(
        localStorage.getItem("lists")
        ?? "{\"Shopping\":[\"eggs\",\"milk\"],\"Tasks\":[\"Climb Everest\"]}"
      );

      this.config = JSON.parse(
        localStorage.getItem("config")
        ?? "{\"lastview\":\"Configuration\",\"theme\":\"theme-default\",\"openLastView\":true}"
      );

      this.SetTheme(this.config.theme);

      this.keys = Object.keys(this.lists);
      if (this.config.openLastView
        && this.config.lastview == "Configuration"
        || this.lists[this.config.lastview] != null) {
        this.view = this.config.lastview ?? "";
      }

    } catch (e: any) {
      console.error("[Error] ", e?.message ?? e);
    }
  }

  changeView(view: string) {
    this.view = view;

    if (this.config.openLastView) {
      this.config.lastview = view;
      this.updateConfig();
    }
  }

  updateLists(config: AppConfig = this.config) {
    this.keys = Object.keys(this.lists).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    localStorage.setItem("lists", JSON.stringify(this.lists));
  }

  updateConfig(config: AppConfig = this.config) {
    localStorage.setItem("config", JSON.stringify(config));
  }


  SetTheme(themename: string = "theme-default") {
    window.document.body.classList.remove(this.config.theme);
    window.document.body.classList.add(themename);
    this.config.theme = themename;
    this.updateConfig();
  }


  newList() {
    const liName = prompt("List Name", "");
    if (liName) {
      this.lists[liName] = [];
      this.updateLists();
    }
  }
  newItem() {
    const liName = prompt("Item Name", "");
    if (liName) {
      this.lists[this.view].push(liName);
      this.updateLists();
    }
  }

  remList($event: MouseEvent, li: string) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    if (confirm("Delete '" + li + "'?")) {
      delete this.lists[li];
      this.updateLists();
    }
  }

  remItem($event: MouseEvent, index: number) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    if (confirm("Delete '" + this.lists[this.view][index] + "'?")) {
      this.lists[this.view].splice(index, 1);
      this.updateLists();
    }
  }

}
