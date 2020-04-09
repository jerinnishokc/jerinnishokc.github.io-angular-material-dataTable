import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { MatSelect } from "@angular/material/select";
import { BrowserStack } from "protractor/built/driverProviders";

export interface Student {
  name: string;
  age: number;
  gender: string;
  subject: string;
  desc: string;
}

const DATA_ARRAY: Student[] = [
  {
    name: "A",
    age: 1,
    gender: "Male",
    subject: "Math",
    desc: "This is an awesome subject.",
  },
  {
    name: "B",
    age: 2,
    gender: "Female",
    subject: "Physics",
    desc: "Cool",
  },
  {
    name: "C",
    age: 3,
    gender: "Male",
    subject: "Chemistry",
    desc: "This is an awesome subject.",
  },
  {
    name: "D",
    age: 4,
    gender: "Female",
    subject: "Geography",
    desc: "Test",
  },
  {
    name: "E",
    age: 5,
    gender: "Male",
    subject: "History",
    desc: "This is an awesome subject.",
  },
];
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", backgroundColor: "red" })
      ),
      state("expanded", style({ height: "*", backgroundColor: "green" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class AppComponent implements OnInit {
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];
  title = "angular-material-demo";
  displayedColumns: string[] = ["name", "age", "gender", "subject"];
  //dataSource = DATA_ARRAY;
  dataSource = new MatTableDataSource<Student>(DATA_ARRAY);
  expandedElement: Student | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("nameFilter", { static: true }) nameFilter: ElementRef;
  @ViewChild("genderFilter", { static: true }) genderFilter: MatSelect;
  @ViewChild("ageFilter1", { static: true }) ageFilter1: MatSelect;
  @ViewChild("ageFilter2", { static: true }) ageFilter2: MatSelect;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (
      data: Student,
      filter: string
    ): boolean => {
      let truth: boolean = true;
      let truthTable = [
        {
          id: "name",
          truth: true,
          check: !!this.nameFilter.nativeElement.value,
        },
        { id: "gender", truth: true, check: !!this.genderFilter.value },
        {
          id: "age",
          truth: true,
          check: !!this.ageFilter1.value && !!this.ageFilter2.value,
        },
        { id: "subject", truth: true, check: false },
      ];

      for (let i = 0; i < truthTable.length; i++) {
        if (truthTable[i].check) {
          switch (truthTable[i].id) {
            case "name":
              truthTable[i].truth =
                data.name
                  .toLowerCase()
                  .indexOf(
                    this.nameFilter.nativeElement.value.trim().toLowerCase()
                  ) != -1;
              break;
            case "gender":
              truthTable[i].truth =
                data.gender.toLowerCase() ==
                this.genderFilter.value.trim().toLowerCase();
              break;
            case "age":
              if (this.ageFilter2.value == ">") {
                truthTable[i].truth = data.age > this.ageFilter1.value;
              } else if (this.ageFilter2.value == "<") {
                truthTable[i].truth = data.age < this.ageFilter1.value;
              } else if (this.ageFilter2.value == "=") {
                truthTable[i].truth = data.age == this.ageFilter1.value;
              } else true;

              break;
            default:
              break;
          }
        }
      }

      truthTable.forEach((value) => {
        truth = truth && value.truth;
      });

      console.log(truth);
      //console.log(data);
      //console.log(filter);

      //console.log(this.nameFilter);
      //console.log(this.genderFilter.value);
      // if (!!this.nameFilter.nativeElement.value) {
      //   truth =
      //     data.name
      //       .toLowerCase()
      //       .indexOf(
      //         this.nameFilter.nativeElement.value.trim().toLowerCase()
      //       ) != -1;
      //   console.log(this.nameFilter.nativeElement.value);
      // } else {
      //   console.log("No name filter");
      // }
      // if (!!this.genderFilter.value) {
      //   truth =
      //     data.name
      //       .toLowerCase()
      //       .indexOf(
      //         this.nameFilter.nativeElement.value.trim().toLowerCase()
      //       ) != -1 &&
      //     data.gender.toLowerCase() ==
      //       this.genderFilter.value.trim().toLowerCase();
      //   console.log(this.genderFilter.value);
      // } else {
      //   console.log("No gender filter");
      // }

      return truth;
    };
  }

  doFilter() {
    this.dataSource.filter = "sample";
  }

  clearFilters() {
    this.nameFilter.nativeElement.value = "";
    this.genderFilter.value = "";
    this.ageFilter1.value = "";
    this.ageFilter2.value = "";
    this.dataSource.filter = "sample";
  }
}
