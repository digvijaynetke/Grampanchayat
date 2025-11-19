import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import api from '../../config/api';

const AboutEditor = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: { english: '', marathi: '', hindi: '' },
    description: { english: '', marathi: '', hindi: '' },
    videoUrl: '',
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.admin.getAbout();
      if (response.success && response.about) {
        setData({
          title: response.about.title || { english: '', marathi: '', hindi: '' },
          description: response.about.description || { english: '', marathi: '', hindi: '' },
          videoUrl: response.about.videoUrl || '',
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value, lang = null) => {
    setData((prev) => {
      if (lang) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [lang]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await api.admin.updateAbout(data);
      if (response.success) {
        setMessage({ type: 'success', text: 'About section updated successfully!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Update failed' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Check permission
  if (!hasPermission(admin, PERMISSIONS.MANAGE_ABOUT)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">You don't have permission to manage About section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">About Section Editor</h2>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Title */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Title</h3>
        <div className="space-y-4">
          {['english', 'marathi', 'hindi'].map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang.toUpperCase()}
              </label>
              <input
                type="text"
                value={data.title[lang] || ''}
                onChange={(e) => handleInputChange('title', e.target.value, lang)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Title in ${lang}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Description</h3>
        <div className="space-y-4">
          {['english', 'marathi', 'hindi'].map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang.toUpperCase()}
              </label>
              <textarea
                value={data.description[lang] || ''}
                onChange={(e) => handleInputChange('description', e.target.value, lang)}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Description in ${lang}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video URL */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Video URL</h3>
        <input
          type="url"
          value={data.videoUrl}
          onChange={(e) => handleInputChange('videoUrl', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/video.mp4"
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter the full URL to the video file (MP4 format recommended)
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;

