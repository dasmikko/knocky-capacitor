export const POSTS_PER_PAGE = 20;

export const unreadPostPage = (unreadPostCount, postCount) =>
  Math.ceil((postCount - (unreadPostCount - 1)) / POSTS_PER_PAGE);
