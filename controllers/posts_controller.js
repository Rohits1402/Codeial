const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

//to create a new post
module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!!",
      });
    }

    req.flash("success", "Post created");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      //delete associated likes for all the post and comments
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });

      post.deleteOne();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("error", "Post and comments deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post");
      res.redirect("back");
    }
  } catch (error) {
    console.log("This is error: ", error);
    req.flash("error", "error from post_controller");
    return res.redirect("back");
  }
};
