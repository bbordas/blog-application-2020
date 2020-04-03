export interface Deserializable {
  deserialize(input: any): this;
}

export class BlogPost implements Deserializable {
  id: number;
  title: string;
  author: string;
  // tslint:disable-next-line:variable-name
  publish_date: string;
  slug: string;
  description: string;
  content: string;
  comment: Comment;

  deserialize(input: any): this {
   return Object.assign(this, input);
  }

  getComments(comments: Array<Comment>, parentId: number) {
    return comments.filter(comment => comment.parent_id === null);
  }
}

export class Comment implements Deserializable {
  id: number;
  postId: number;
  // tslint:disable-next-line:variable-name
  parent_id: number;
  user: string;
  date: string;
  content: string;
  post: BlogPost;

  deserialize(input: any): this {
   return Object.assign(this, input);
  }

  getChildComments(comments: Array<Comment>, parentId: number) {
    return comments.filter(comment => comment.parent_id === parentId);
  }
}

