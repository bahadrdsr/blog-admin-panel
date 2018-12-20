import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Tag } from "../models/tag";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  tagsCollection: AngularFirestoreCollection<Tag>;
  tagDoc: AngularFirestoreDocument<Tag>;
  tags: Observable<Tag[]>;
  tag: Observable<Tag>;
  constructor(private _fireStore: AngularFirestore) {
    this.tagsCollection = this._fireStore.collection("tags", ref =>
      ref.orderBy("name", "asc")
    );
  }
  getTags(): Observable<Tag[]> {
    this.tags = this.tagsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Tag;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.tags;
  }
  getTag(id: string): Observable<Tag> {
    this.tagDoc = this._fireStore.doc<Tag>(`tags/${id}`);
    this.tag = this.tagDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Tag;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
    return this.tag;
  }
  deleteTag(tag : Tag){
    this.tagDoc = this._fireStore.doc(`tags/${tag.id}`);
    this.tagDoc.delete();
  }
  addTag(tag: Tag) {
    this.tagsCollection.add(tag);
  }
  updateTag(tag: Tag) {
    this.tagDoc = this._fireStore.doc(`tags/${tag.id}`);
    this.tagDoc.update(tag);
  }
}
