import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Comment } from "../models/comment";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class CommentsService {
  commentCollection: AngularFirestoreCollection<Comment>;
  commentDoc: AngularFirestoreDocument<Comment>;
  comments: Observable<Comment[]>;
  comment: Observable<Comment>;
  constructor(private _fireStore: AngularFirestore) {
    this.commentCollection = this._fireStore.collection("comments", ref =>
      ref.orderBy("createdDate", "desc")
    );
  }
  getComments(): Observable<Comment[]> {
    this.comments = this.commentCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.comments;
  }
  getComment(id: string): Observable<Comment> {
    this.commentDoc = this._fireStore.doc<Comment>(`comments/${id}`);
    this.comment = this.commentDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Comment;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
    return this.comment;
  }
  deleteComment(comment: Comment) {
    this.commentDoc = this._fireStore.doc(`comments/${comment.id}`);
    this.commentDoc.delete();
  }
  addComment(comment: Comment) {
    this.commentCollection.add(comment);
  }
  editComment(comment: Comment) {
    this.commentDoc = this._fireStore.doc(`comments/${comment.id}`);
    this.commentDoc.update(comment);
  }
}
