export interface membersResponse {
  id: number;
  name: string;
  profilePictureUrl: string;
}

export interface PostsResponseWithPagination {
  data?: PostResnponse[];
  posts: PostResnponse[];
  pagination: {
    page: number;
    limit: number;
    count: number;
    hasMore: boolean;
  };
}

export interface PostResnponse {
  id: number;
  text: string;
  createdAt: string | Date;
  author: membersResponse;
  attachments: AttachmentsResponse[];
}

export interface AttachmentsResponse {
  id: number;
  url: string;
  type: AttachmentType;
}

export type AttachmentType = "image" | "video";
