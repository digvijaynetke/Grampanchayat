import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import api from '../../config/api';

const LeadershipManager = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [officials, setOfficials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: { en: '', mr: '', hi: '' },
    role: { en: '', mr: '', hi: '' },
    village: { en: '', mr: '', hi: '' },
    description: { en: '', mr: '', hi: '' },
    contact: '',
    isSarpanch: false,
    order: 0,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    try {
      const response = await api.admin.getOfficials();
      if (response.success) {
        setOfficials(response.officials);
      }
    } catch (error) {
      console.error('Error fetching officials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value, lang = null) => {
    setFormData((prev) => {
      if (lang && ['name', 'role', 'village', 'description'].includes(field)) {
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

  const handleImageUpload = async (e, officialId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const component = formData.isSarpanch ? 'leadership-sarpanch' : 'leadership-team';
      const category = formData.isSarpanch ? null : formData.role.mr;
      
      const response = await api.admin.uploadImage(file, component, category, 'Official photo', formData.order);
      if (response.success) {
        if (officialId) {
          // Update existing official with new image
          await api.admin.updateOfficial(officialId, { imageId: response.imageId });
          fetchOfficials();
        } else {
          // Store imageId for new official
          setFormData((prev) => ({ ...prev, imageId: response.imageId }));
        }
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Image upload failed' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (official) => {
    setFormData({
      name: official.name || { en: '', mr: '', hi: '' },
      role: official.role || { en: '', mr: '', hi: '' },
      village: official.village || { en: '', mr: '', hi: '' },
      description: official.description || { en: '', mr: '', hi: '' },
      contact: official.contact || '',
      isSarpanch: official.isSarpanch || false,
      order: official.order || 0,
      imageId: official.imageId,
    });
    setEditingId(official.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this official?')) return;

    try {
      await api.admin.deleteOfficial(id);
      setMessage({ type: 'success', text: 'Official deleted successfully!' });
      fetchOfficials();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Delete failed' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (editingId) {
        await api.admin.updateOfficial(editingId, formData);
        setMessage({ type: 'success', text: 'Official updated successfully!' });
      } else {
        await api.admin.createOfficial(formData);
        setMessage({ type: 'success', text: 'Official created successfully!' });
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: { en: '', mr: '', hi: '' },
        role: { en: '', mr: '', hi: '' },
        village: { en: '', mr: '', hi: '' },
        description: { en: '', mr: '', hi: '' },
        contact: '',
        isSarpanch: false,
        order: 0,
      });
      fetchOfficials();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Operation failed' });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Check permission
  if (!hasPermission(admin, PERMISSIONS.MANAGE_LEADERSHIP)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">You don't have permission to manage Leadership.</p>
      </div>
    );
  }

  const sarpanch = officials.find((o) => o.isSarpanch);
  const teamMembers = officials.filter((o) => !o.isSarpanch).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Leadership Management</h2>
        {hasPermission(admin, PERMISSIONS.MANAGE_LEADERSHIP) && (
          <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              name: { en: '', mr: '', hi: '' },
              role: { en: '', mr: '', hi: '' },
              village: { en: '', mr: '', hi: '' },
              description: { en: '', mr: '', hi: '' },
              contact: '',
              isSarpanch: false,
              order: 0,
            });
          }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Add Official
          </button>
        )}
      </div>

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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingId ? 'Edit Official' : 'Add New Official'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isSarpanch}
                    onChange={(e) => handleInputChange('isSarpanch', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="font-medium">Is Sarpanch?</span>
                </label>
              </div>

              {/* Name */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Name</h4>
                {['en', 'mr', 'hi'].map((lang) => (
                  <input
                    key={lang}
                    type="text"
                    value={formData.name[lang] || ''}
                    onChange={(e) => handleInputChange('name', e.target.value, lang)}
                    placeholder={`Name (${lang})`}
                    className="w-full px-3 py-2 border rounded-md mb-2"
                    required
                  />
                ))}
              </div>

              {/* Role */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Role</h4>
                {['en', 'mr', 'hi'].map((lang) => (
                  <input
                    key={lang}
                    type="text"
                    value={formData.role[lang] || ''}
                    onChange={(e) => handleInputChange('role', e.target.value, lang)}
                    placeholder={`Role (${lang})`}
                    className="w-full px-3 py-2 border rounded-md mb-2"
                    required
                  />
                ))}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-semibold mb-2">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, editingId)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                />
              </div>

              {/* Contact */}
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Contact Number"
                className="w-full px-3 py-2 border rounded-md"
              />

              {/* Order (for team members) */}
              {!formData.isSarpanch && (
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                  placeholder="Order (for sorting)"
                  className="w-full px-3 py-2 border rounded-md"
                />
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sarpanch */}
      {sarpanch && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Sarpanch</h3>
          <div className="flex items-center gap-4">
            {sarpanch.imageUrl && (
              <img src={sarpanch.imageUrl} alt="Sarpanch" className="w-24 h-24 object-cover rounded-lg" />
            )}
            <div className="flex-1">
              <p className="font-semibold">{sarpanch.name?.mr || sarpanch.name?.en}</p>
              <p className="text-sm text-gray-600">{sarpanch.role?.mr || sarpanch.role?.en}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(sarpanch)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              {member.imageUrl && (
                <img src={member.imageUrl} alt="Member" className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{member.name?.mr || member.name?.en}</p>
                <p className="text-sm text-gray-600">{member.role?.mr || member.role?.en}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {teamMembers.length === 0 && (
            <p className="text-gray-500 text-center py-4">No team members added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadershipManager;

