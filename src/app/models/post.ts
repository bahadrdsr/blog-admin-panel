import { Tag } from 'src/app/models/tag';
import { Comment } from 'src/app/models/comment';

export interface Post {
  createdBy?: string;
  author?: string;
  body: string;
  title: string;
  comments?: Comment[];
  imageUri?: string;
  id?: string;
  isPublished: boolean;
  createdDate? : any;
  modifiedDate? : any;
  publishedDate? : any;
  tags?: Tag[];
}
