import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";
import { MaterialModule } from "@app/material/material.module";
import { User } from "@app/_state/users/users-store";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  accordionItems: User[] = [];
  userForm!: FormGroup;
  processing = false;

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "maidenName",
    "age",
    "gender",
    "email",
    "phone",
    "birthDate",
    "action",
  ];
  dataSource = new MatTableDataSource<any>();
  isEditableNew: boolean = true;

  joined: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.initiateUserForm();
  }

  loadData() {
    this.userService.getUsers().subscribe((result: any) => {
      this.accordionItems = result.users;

      console.log("Users", this.accordionItems);
      if (this.accordionItems.length > 0) {
        this.loadForm();
      }
    });
  }

  initiateUserForm() {
    this.userForm = this._formBuilder.group({
      UserRows: this._formBuilder.array([]),
    });
    this.userForm = this._formBuilder.group({
      UserRows: this.fb.group({
        id: new FormControl(""),
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        maidenName: new FormControl(""),
        age: new FormControl(""),
        gender: new FormControl(""),
        email: new FormControl(""),
        phone: new FormControl(""),
        birthDate: new FormControl(""),
        action: new FormControl("existingRecord"),
        isEditable: new FormControl(true),
        isNewRow: new FormControl(false),
      }),
    });
  }

  loadForm() {
    this.userForm = this._formBuilder.group({
      UserRows: this._formBuilder.array([]),
    });

    this.userForm = this.fb.group({
      UserRows: this.fb.array(
        this.accordionItems.map((val) =>
          this.fb.group({
            id: new FormControl(val.id),
            firstName: new FormControl(val.firstName),
            lastName: new FormControl(val.lastName),
            maidenName: new FormControl(val.maidenName),
            age: new FormControl(val.age),
            gender: new FormControl(val.gender),
            email: new FormControl(val.email),
            phone: new FormControl(val.phone),
            birthDate: new FormControl(val.birthDate),
            action: new FormControl("existingRecord"),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    });

    this.dataSource = new MatTableDataSource(
      (this.userForm.get("UserRows") as FormArray).controls
    );
  }


  onSave(VOFormElement: any, i: any) {
    this.processing = true;

    setTimeout(() => {
      this.processing = false;
      VOFormElement.get("UserRows").at(i).get("isEditable").patchValue(true);
    }, 1500);
  }

  onCancel(VOFormElement: any, i: any) {
    VOFormElement.get("UserRows").at(i).get("isEditable").patchValue(true);
  }
}
