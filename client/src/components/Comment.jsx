/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addComment, getAllComment } from "../services/CommentService";
import { useAuth } from "../contexts/AuthContext";


export function Comment( {moviedId, handleOpen}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const handleCommentChange = (e) => setCommentText(e.target.value);
  const { isAuth } = useAuth();

  console.log(comments);
  
  const handleAddComment = () => {
    if (commentText.trim()) {
      
      if (!isAuth) {
        handleOpen(true);
        return;
      }
      setComments([{ content: commentText, userId: { email: "You" }, timeAgo: "Just now" },...comments]);
      setCommentText("");
      addComment({ content: commentText, movieId: moviedId });
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await getAllComment(moviedId);
        setComments(data.comments);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchComment();
  }, [moviedId]);

  return (
    <div className="mt-2 ml-4">
      <Typography variant="h4" className="text-gray-800 font-bold">
        Comment
      </Typography>

      <div className="bg-white p-4 rounded-md shadow-md mb-6 flex flex-col">
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write your comment..."
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-4 w-[200px] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 self-end"
        >
          Post Comment
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-md">
            <img
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
        
            <div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold ">{comment.userId.email}</span> · {comment.timeAgo}
              </div>
          
              <p className="mt-1 text-sm text-black">
                {comment.content}
              </p>
            </div>
          </div>
        
        ))}
      </div>

    </div>
  );
}


