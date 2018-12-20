import { Component, OnInit } from "@angular/core";
import { CommentsService } from "../../services/comments.service";
import { Comment } from "../../models/comment";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  constructor(private _commentService: CommentsService) {}

  ngOnInit() {
    this.getComments();
  }
  getComments() {
    this._commentService.getComments().subscribe(comments => {
      comments.map(comment => {
        comment.createdDate = new Date(comment.createdDate.seconds * 1000);
        comment.publishedDate = new Date(comment.publishedDate.seconds * 1000);
      });
      this.comments = comments;
    });
  }
  publish(comment: Comment) {
    comment.isPublished = true;
    this._commentService.editComment(comment);
  }
  deactivate(comment: Comment) {
    comment.isPublished = false;
    this._commentService.editComment(comment);
  }
}
