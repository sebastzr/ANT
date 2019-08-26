import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  antForm = this.fb.group({
    chapterOne: this.fb.group({
      name: [''],
    }),
    chapterTwo: this.fb.group({
      lastname: [''],
    })
  });

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  constructor(
    db: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.itemsCollection = db.collection<Item>('items');
    this.items = db.collection('items').valueChanges();
  }

  create (item: Item) {
    this.itemsCollection.add(item);
  }

  onSubmit() {
    console.warn(this.antForm.value.chapterOne.name);
  }

}
