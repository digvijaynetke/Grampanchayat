import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import api from '../../config/api';

const HeroEditor = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    villageName: { english: '', marathi: '', hindi: '' },
    descriptions: [
      { subtitle: { english: '', marathi: '', hindi: '' }, description: { english: '', marathi: '', hindi: '' } },
      { subtitle: { english: '', marathi: '', hindi: '' }, description: { english: '', marathi: '', hindi: '' } },
    ],
  });
  const [heroImage, setHeroImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.admin.getHero();
      if (response.success) {
        setData({
          villageName: response.hero.villageName || { english: '', marathi: '', hindi: '' },
          descriptions: response.hero.descriptions || data.descriptions,
        });
        setHeroImage(response.hero);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (path, value, lang = null) => {
    setData((prev) => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      if (lang) {
        if (!current[keys[keys.length - 1]]) {
          current[keys[keys.length - 1]] = {};
        }
        current[keys[keys.length - 1]][lang] = value;
      } else {
        current[keys[keys.length - 1]] = value;
      }

      return newData;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response = await api.admin.uploadImage(file, 'home-hero', null, 'Hero image', 0);
      if (response.success) {
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
        fetchData(); // Refresh to get new image
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Image upload failed' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await api.admin.updateHero({
        villageName: data.villageName,
        descriptions: data.descriptions,
      });
      if (response.success) {
        setMessage({ type: 'success', text: 'Hero section updated successfully!' });
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
  if (!hasPermission(admin, PERMISSIONS.MANAGE_HERO)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">You don't have permission to manage Hero section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hero Section Editor</h2>

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

      {/* Hero Image Upload */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Hero Image</h3>
        {heroImage?.imageUrl && (
          <div className="mb-4">
            <img
              src={heroImage.imageUrl}
              alt="Hero"
              className="w-full max-w-md h-64 object-cover rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploadingImage}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploadingImage && <p className="text-sm text-gray-600 mt-2">Uploading...</p>}
      </div>

      {/* Village Name */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Village Name</h3>
        <div className="space-y-4">
          {['english', 'marathi', 'hindi'].map((lang) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {lang.toUpperCase()}
              </label>
              <input
                type="text"
                value={data.villageName[lang] || ''}
                onChange={(e) => handleInputChange('villageName', e.target.value, lang)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Village name in ${lang}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Descriptions */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Description Blocks (3 blocks)</h3>
        {data.descriptions.map((desc, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-4">Block {index + 1}</h4>
            <div className="space-y-4">
              {['en', 'mr', 'hi'].map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={desc.subtitle[lang] || ''}
                    onChange={(e) =>
                      handleInputChange(`descriptions.${index}.subtitle`, e.target.value, lang)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description ({lang.toUpperCase()})
                  </label>
                  <textarea
                    value={desc.description[lang] || ''}
                    onChange={(e) =>
                      handleInputChange(`descriptions.${index}.description`, e.target.value, lang)
                    }
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default HeroEditor;

