import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;
  posts: Observable<Post[]>;
  post: Observable<Post>;
  constructor(private _fireStore: AngularFirestore) {
    this.postsCollection = this._fireStore.collection("posts", ref =>
      ref.orderBy("createdDate", "desc")
    );
  }
  getPosts(): Observable<Post[]> {
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.posts;
  }
  getPost(id: string): Observable<Post> {
    this.postDoc = this._fireStore.doc<Post>(`posts/${id}`);
    this.post = this.postDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Post;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
    return this.post;
  }
  deletePost(post : Post){
    this.postDoc = this._fireStore.doc(`posts/${post.id}`);
    this.postDoc.delete();
  }
  addPost(post: Post) {
    this.postsCollection.add(post);
  }
  updatePost(post: Post) {
    this.postDoc = this._fireStore.doc(`posts/${post.id}`);
    this.postDoc.update(post);
  }
}
