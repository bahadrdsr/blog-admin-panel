import { PostsService } from "./../../../services/posts.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Post } from "../../../models/post";
@Component({
  selector: "app-post-delete",
  templateUrl: "./post-delete.component.html",
  styleUrls: ["./post-delete.component.scss"]
})
export class PostDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PostDeleteComponent>,
    private _postService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onCancel() {
    this.dialogRef.close(false);
  }
  onConfirm() {
    this._postService.deletePost(this.data);
    this.snackBar.open("Post deleted succesfully", null, {
      duration: 1000,
      panelClass: ["success-snackbar"],
      verticalPosition: "top",
      horizontalPosition: "center"
    });
    this.dialogRef.close(true);
  }
}
