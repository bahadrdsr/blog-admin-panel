import { PostsService } from "./../../../services/posts.service";
import { CommentsService } from "./../../../services/comments.service";
import { Component, OnInit } from "@angular/core";
import { Comment } from "../../../models/comment";
import { MatSnackBar } from "@angular/material";
import { Post } from '../../../models/post';
import { Router } from '@angular/router';

@Component({
  selector: "app-comment-create",
  templateUrl: "./comment-create.component.html",
  styleUrls: ["./comment-create.component.scss"]
})
export class CommentCreateComponent implements OnInit {
  body: string = "";
  post : Post;
  posts : Post[];
  constructor(
    private _commentService: CommentsService,
    public snackBar: MatSnackBar,
    private _postService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this._postService.getPosts().subscribe(posts =>{
      this.posts = posts;
    });
  }

  newComment() {
    const comment: Comment = {
      body: this.body,
      isPublished: true,
      publishedDate: new Date(),
      createdDate: new Date(),
      author: "Bahadir Doser",
      postId : this.post.id,
      postTitle : this.post.title
    };
    this._commentService.addComment(comment);
    this.snackBar.open("Comment saved succesfully", null, {
      duration: 2000,
      panelClass: ["success-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center"
    });
    this.router.navigate(["/comments"]);
  }
}
