import { Component, OnInit, ViewChild } from '@angular/core';
import studentsTableList from '../json-file/students-table-list.json';
import schoolTableList from '../json-file/school-table-list.json';
import schoolList from '../json-file/school-list.json';
import schoolCorrectorList from '../json-file/school-corrector-list.json';
import correctorList from '../json-file/corrector-list.json';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['student', 'origin', 'correcting', 'corrector'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  studentsTableLists = JSON.parse(JSON.stringify(studentsTableList)) ;
  schoolTableLists = schoolTableList;
  schoolLists = schoolList;
  schoolCorrectorLists = schoolCorrectorList;
  correctorLists = correctorList.map((val) => {
    return {
      _id: val.school_correcting_corrector_id._id,
      full_name: val.school_correcting_corrector_id.last_name + ' ' + val.school_correcting_corrector_id.first_name,
      first_name: val.school_correcting_corrector_id.first_name,
      last_name: val.school_correcting_corrector_id.last_name
    }
  });

  tmpArr: any[] = [];

  filterObj: { student: string, origin: string, correcting: string, corrector: string } = { student: null, origin: null, correcting: null, corrector: null }; // <-- declare this at the start of your component.

  ngOnInit() {

    let self = this;

    console.log(this.studentsTableLists)

    this.studentsTableLists.forEach((studentVal) => {

      self.tmpArr.push({lists: (self.schoolLists as Array<any>).filter((slVal) => {

        return studentVal.school_origin_id._id !== slVal.school._id;

      }).map((sval) => {

        let corrector = self.schoolCorrectorLists.filter((scval) => {
          return scval.school._id === sval.school._id
        })[0]

        return {...sval, cross_correctors: corrector.cross_correctors}

      })})

    })

    console.log(self.tmpArr)
    this.dataSource.data = this.studentsTableLists;

    this.dataSource.filterPredicate = (myObject, filter) => {
      let filterObj: { student: string, origin: string, correcting: string, corrector: string } = JSON.parse(filter);
      if(
        ((filterObj.student && filterObj.student != '') ? String(myObject.student_id.last_name + ' ' + myObject.student_id.first_name).toLowerCase().includes(filterObj.student)  : true) &&
        ((filterObj.origin && filterObj.origin != '') ? String(myObject.school_origin_id.short_name).toLowerCase().includes(filterObj.origin) : true) &&
        ((filterObj.origin && filterObj.correcting != '') ? String(myObject.school_correcting_id.short_name).toLowerCase().includes(filterObj.correcting) : true) &&
        ((filterObj.origin && filterObj.corrector != '') ? String(myObject.school_correcting_corrector_id.last_name + ' ' + myObject.school_correcting_corrector_id.first_name).toLowerCase().includes(filterObj.corrector) : true)
        ) {
        return true;
      } else {
        return false;
      }
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string, type: string) {
    switch (type) {
      case 'student':
        this.filterObj.student = value;
        break;
      case 'origin':
        this.filterObj.origin = value;
        break;
      case 'correcting':
        this.filterObj.correcting = value;
        break;
      case 'corrector':
        this.filterObj.corrector = value;
        break;
      default:
        break;
    }
    this.dataSource.filter = JSON.stringify(this.filterObj);
  }

  onCorrectorChange(event, index) {

    if(event) {
      let tmpdata = JSON.parse(JSON.stringify(this.studentsTableLists[index]));

      (this.studentsTableLists as Array<any>).splice(index, 1, {
        ...tmpdata,
        school_correcting_corrector_id :{_id  : event._id, first_name : event.first_name, last_name : event.last_name}
      })
    }

  }

  onCorrectorClear(index) {

    this.studentsTableLists[index].school_correcting_corrector_id =  {_id  : null, first_name : null, last_name : null};

  }

  onSchoolChange(event, index) {
    console.log(event, index)

    if(event) {
      let tmpdata = JSON.parse(JSON.stringify(this.studentsTableLists[index]));

      (this.studentsTableLists as Array<any>).splice(index, 1, {
        ...tmpdata,
        school_correcting_id :{_id  : event.school._id, short_name : event.school.short_name},
        school_correcting_corrector_id :  {_id  : null, first_name : null, last_name : null}
      })
    }


    this.tmpArr[index]['selectedIndex'] = this.tmpArr[index].lists.findIndex((val) => val.school._id === event.school._id);

  }

  onSchoolClear(index) {

    this.studentsTableLists[index].school_correcting_id =  {_id  : null, short_name : null};

  }


}
