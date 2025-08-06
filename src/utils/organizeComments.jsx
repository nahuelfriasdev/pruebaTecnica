const organizeComments = (comments) => {
  const commentMap = {};
  const organizedComments = [];

  comments.forEach(comment => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach(comment => {
    const mappedComment = commentMap[comment.id];

    if (comment.parentId) {
      const parent = commentMap[comment.parentId];
      if (parent) {
        parent.replies.push(mappedComment);
      } else {
        organizedComments.push(mappedComment);
      }
    } else {
      organizedComments.push(mappedComment);
    }
  });
  return organizedComments;
};

export default organizeComments;