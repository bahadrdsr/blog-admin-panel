import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Post } from "../../models/post";
import { PostsService } from "../../services/posts.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { PostDeleteComponent } from "./post-delete/post-delete.component";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts: Post[];
  pageIndex: number;
  pageSize: number;
  hasMore: boolean;

  constructor(private _postService: PostsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this._postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  onDelete(post: Post) {
    const dialogRef = this.dialog.open(PostDeleteComponent, {
      width: "500px",
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.posts = this.posts.filter(p => p.id !== post.id);
      }
    });
  }
}
