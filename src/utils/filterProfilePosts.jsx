const filterProfilePosts = (posts, user) => {
  let profilePost = posts.filter((post) => post.name == user.name)
  return profilePost
}

export default filterProfilePosts;