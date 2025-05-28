import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import PurchaseButton from "./Purchase";

const PAGE_SIZE = 5;

const VideoList = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [purchasedVideos, setPurchasedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialPurchases = async () => {
      try {
        const purchaseRes = await api.get("/purchases");
        setPurchasedVideos(purchaseRes.data.purchasedVideos || []);
      } catch (error) {
        console.error("Failed to fetch purchases", error);
      }
    };
    fetchInitialPurchases();
  }, []);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await api.get(`/videos`);
        const sortedVideos = res.data.sort(
          (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
        );
        setAllVideos(sortedVideos);
        setDisplayedVideos(sortedVideos.slice(0, PAGE_SIZE));
        setHasMore(sortedVideos.length > PAGE_SIZE);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchAllVideos();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const newDisplayedCount = nextPage * PAGE_SIZE;
    setDisplayedVideos(allVideos.slice(0, newDisplayedCount));
    setPage(nextPage);

    if (newDisplayedCount >= allVideos.length) {
      setHasMore(false);
    }
  };

  const handlePurchaseComplete = (videoId) => {
    setPurchasedVideos((prev) => [...prev, videoId]);
  };

  const getCloudinaryThumbnail = (videoUrl) => {
    try {
      const ytMatch = videoUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      if (ytMatch && ytMatch[1]) {
        return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
      }

      if (videoUrl.includes("/upload/")) {
        return videoUrl
          .replace("/upload/", "/upload/so_3/")
          .replace(/\.(mp4|webm|mov)$/, ".jpg");
      }

      return "/placeholder.jpg";
    } catch (error) {
      console.error("Failed to get thumbnail for:", videoUrl);
      return "/placeholder.jpg";
    }
  };

  return (
    <div className="w-full px-4 py-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          🎬 <span>Boom Feed</span>
        </h2>
        <button
          onClick={() => navigate("/upload")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow transition"
        >
          + Upload
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {displayedVideos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading videos...
          </p>
        ) : (
          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            {displayedVideos.map((video) => {
              const isPurchased = purchasedVideos.includes(video.id);

              return (
                <div
                  key={video.id}
                  className="relative bg-white shadow-lg rounded-xl overflow-hidden transition hover:scale-[1.02] hover:shadow-xl duration-300"
                >
                  <div className="relative h-96">
                    {video.videoType === "Short-Form" ? (
                      <video
                        src={video.videoUrl}
                        muted
                        loop
                        playsInline
                        data-short-form
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={getCloudinaryThumbnail(video.videoUrl)}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {video.price > 0 && !isPurchased && (
                      <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        ₹{video.price}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent text-white p-4 flex flex-col justify-end">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs italic text-gray-300">
                        {video.creatorName || "Unknown"}
                      </p>

                      <div className="absolute bottom-4 right-4">
                        {video.videoType === "Long-Form" ? (
                          isPurchased || video.price === 0 ? (
                            <button
                              className="border border-white text-white py-1.5 px-4 rounded w-fit"
                              onClick={() => navigate(`/videos/${video.id}`)}
                              aria-label="Watch Video"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="white"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <polygon points="8,5 19,12 8,19" />
                              </svg>
                            </button>
                          ) : (
                            <PurchaseButton
                              videoId={video.id}
                              price={video.price}
                              onPurchaseComplete={() =>
                                handlePurchaseComplete(video.id)
                              }
                            />
                          )
                        ) : (
                          <button
                            className="border border-white text-white py-1.5 px-4 rounded w-fit"
                            onClick={() => navigate(`/videos/${video.id}`)}
                            aria-label="Watch Video"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="white"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <polygon points="8,5 19,12 8,19" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasMore && displayedVideos.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && displayedVideos.length > 0 && (
          <p className="text-center text-gray-400 text-sm my-6">
            🎉 You've reached the end
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoList;