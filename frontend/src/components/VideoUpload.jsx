import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoType, setVideoType] = useState('Short-Form');
  const [price, setPrice] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoType === 'Short-Form' && !videoFile) {
      toast.error('Please select a video file to upload.');
      return;
    }

    if (videoType === 'Long-Form' && !videoUrl.trim()) {
      toast.error('Please enter a valid video URL.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoType', videoType);
    formData.append('price', videoType === 'Long-Form' ? price : 0);

    if (videoType === 'Short-Form') {
      formData.append('video', videoFile);
    } else {
      formData.append('videoUrl', videoUrl);
    }

    try {
      setLoading(true);
      await api.post('/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideoType('Short-Form');
      setPrice(0);
      setVideoFile(null);
      setVideoUrl('');
      navigate('/feed');
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload a New Video</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter video title"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Write a short description..."
            rows="3"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Video Type</label>
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="Short-Form">Short-Form</option>
            <option value="Long-Form">Long-Form</option>
          </select>
        </div>

        {videoType === 'Long-Form' && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Video URL</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>
        )}

        {videoType === 'Short-Form' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-1/2 py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;