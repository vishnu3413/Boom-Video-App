import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [giftAmount, setGiftAmount] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get("/videos");
        const found = res.data.find((v) => v.id === id);
        if (found) setVideo(found);
        else console.warn("Video not found");
      } catch (err) {
        toast.error(err.response?.data?.message || "Error fetching video");
        console.error("Error fetching video:", err);
      }
    };
    fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.warn("Comments fetch failed or endpoint missing");
      }
    };
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/comments/${id}`, { content: newComment });
      toast.success(res.data.message || `Comment added!`);
      setComments([res.data, ...comments]);
      setNewComment("");
      const updatedComments = await api.get(`/comments/${id}`);
      setComments(updatedComments.data);
    } catch (err) {
      toast.error("Error posting comment");
      console.error("Error posting comment:", err);
    }
  };

  const handleGift = async () => {
    const amount = parseInt(giftAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid gift amount");
      return;
    }

    try {
      const response = await api.post("/gifts", {
        videoId: id,
        amount,
      });
      toast.success(
        response.data.message || `You gifted ₹${amount} to the creator!`
      );
      setGiftAmount("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Insufficient balance or error sending gift."
      );
      console.error(err);
    }
  };

  const extractYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  };

  if (!video)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const isShortForm = video.videoType?.toLowerCase().includes("short");

  return (
    <div className="flex justify-center items-start min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-4xl w-full">
        <button
          onClick={() => navigate("/feed")}
          className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 font-medium"
        >
          ← Go Back
        </button>

        <div className="mb-6">
          {isShortForm ? (
            <video
              className="w-full rounded-lg shadow"
              controls
              autoPlay
              muted
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow"
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  video.videoUrl
                )}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
        <p className="text-gray-600 mb-1">{video.description}</p>
        <p className="text-gray-500 mb-4">By: {video.creatorName}</p>

        <div className="mb-8">
          <h4 className="text-lg font-medium mb-2">Gift the Creator</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter ₹ amount"
              value={giftAmount}
              onChange={(e) => setGiftAmount(e.target.value)}
              className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleGift}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Gift
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Comments</h4>
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Post
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-3 rounded">
                  <strong className="block text-sm text-gray-700 mb-1">
                    {comment.commenter}
                  </strong>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
