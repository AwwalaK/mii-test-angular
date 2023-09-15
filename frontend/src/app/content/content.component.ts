import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  data: any[] = [];
  selectedData: any = {};
  createForm: FormGroup;
  editForm: FormGroup;
  editMode: boolean = false;
  createMode: boolean = false;
  submitted: any = {
    userId: false,
    title: false,
  };

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      userId: [null, Validators.required],
      completed: [false],
    });

    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      userId: [null, Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.dataService.getAllData().subscribe((data) => {
      this.data = data;
    });
  }

  editData(item: any) {
    this.editMode = true;
    this.createMode = false;
    this.selectedData = item;

    this.submitted.userId = false;
    this.submitted.title = false;

    this.editForm.setValue({
      title: item.title,
      userId: item.userId,
      completed: item.completed,
    });
  }

  updateData() {
    this.submitted.userId = false;
    this.submitted.title = false;
    
    if (this.editForm.invalid) {
      console.log('Data edit tidak valid');

      if (!this.editForm.value?.title) {
        this.submitted.title = true;
      }

      if (!this.editForm.value?.userId) {
        this.submitted.userId = true;
      }

      return;
    }

    const formData = this.editForm.value;

    this.dataService.updateData(this.selectedData.id, formData).subscribe(() => {
      console.log('Data berhasil diperbarui:', formData);
      this.loadAllData();
      this.cancelEdit();
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedData = {};
    this.editForm.reset();
    this.submitted = {
      userId: false,
      title: false,
    };
  }

  buatData() {
    this.createMode = true;
    this.editMode = false;

    this.createForm.reset();
    this.submitted.userId = false;
    this.submitted.title = false;
  }

  createData() {
    this.submitted.userId = false;
    this.submitted.title = false;
    
    if (this.createForm.invalid) {
      console.log('Data tidak valid', this.createForm);

      if (!this.createForm.value?.title) {
        this.submitted.title = true;
      }

      if (!this.createForm.value?.userId) {
        this.submitted.userId = true;
      }

      return;
    }

    const formData = this.createForm.value;
    this.dataService.createData(formData).subscribe(() => {
      console.log('Response:', formData);
      this.loadAllData();
      this.cancelCreate();
    });
  }

  cancelCreate() {
    this.createMode = false;
    this.createForm.reset();
    this.submitted = {
      userId: false,
      title: false,
    };
  }

  deleteData(id: number) {
    this.dataService.deleteData(id).subscribe(() => {
      console.log(`Data dengan ID ${id} telah dihapus`);
      this.loadAllData();
      this.selectedData = {};
    });
  }
}
