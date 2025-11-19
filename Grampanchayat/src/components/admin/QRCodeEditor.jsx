import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import api from '../../config/api';

const QRCodeEditor = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [qrCodes, setQRCodes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    imageId: null,
    price: '',
    purpose: { en: '', mr: '', hi: '' },
    description: { en: '', mr: '', hi: '' },
    isActive: true,
    order: 0,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      const response = await api.admin.getQRCodes();
      if (response.success) {
        setQRCodes(response.qrCodes);
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      setMessage({ type: 'error', text: 'Failed to load QR codes' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value, lang = null) => {
    setFormData((prev) => {
      if (lang && ['purpose', 'description'].includes(field)) {
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

  const handleImageUpload = async (e, qrCodeId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response = await api.admin.uploadImage(
        file,
        'qr-code',
        null,
        formData.purpose.mr || 'QR Code',
        formData.order
      );
      if (response.success) {
        if (qrCodeId) {
          // Update existing QR code with new image
          await api.admin.updateQRCode(qrCodeId, { imageId: response.imageId });
          fetchQRCodes();
        } else {
          // Store imageId for new QR code
          setFormData((prev) => ({ ...prev, imageId: response.imageId }));
        }
        setMessage({ type: 'success', text: 'QR code image uploaded successfully!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Image upload failed' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (qrCode) => {
    setFormData({
      imageId: qrCode.imageId,
      price: qrCode.price || '',
      purpose: qrCode.purpose || { en: '', mr: '', hi: '' },
      description: qrCode.description || { en: '', mr: '', hi: '' },
      isActive: qrCode.isActive !== false,
      order: qrCode.order || 0,
    });
    setEditingId(qrCode.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this QR code?')) return;

    try {
      const response = await api.admin.deleteQRCode(id);
      if (response.success) {
        setMessage({ type: 'success', text: 'QR code deleted successfully!' });
        fetchQRCodes();
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Delete failed' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.imageId) {
      setMessage({ type: 'error', text: 'Please upload a QR code image first' });
      return;
    }

    try {
      if (editingId) {
        const response = await api.admin.updateQRCode(editingId, formData);
        if (response.success) {
          setMessage({ type: 'success', text: 'QR code updated successfully!' });
          resetForm();
          fetchQRCodes();
        }
      } else {
        const response = await api.admin.createQRCode(formData);
        if (response.success) {
          setMessage({ type: 'success', text: 'QR code created successfully!' });
          resetForm();
          fetchQRCodes();
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Operation failed' });
    }
  };

  const resetForm = () => {
    setFormData({
      imageId: null,
      price: '',
      purpose: { en: '', mr: '', hi: '' },
      description: { en: '', mr: '', hi: '' },
      isActive: true,
      order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getImageUrl = (imageId) => {
    if (!imageId) return null;
    return api.getImage(imageId);
  };

  if (!hasPermission(admin, PERMISSIONS.UPLOAD_IMAGES)) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <p className="text-red-600">You don't have permission to manage QR codes.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading QR codes...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">QR Code Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add QR Code'}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit QR Code' : 'Add New QR Code'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* QR Code Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Image *
              </label>
              {formData.imageId ? (
                <div className="relative">
                  <img
                    src={getImageUrl(formData.imageId)}
                    alt="QR Code"
                    className="w-48 h-48 object-contain border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, imageId: null }))}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    disabled={uploadingImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  {uploadingImage && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Purpose - English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose (What is this QR for?) - English
              </label>
              <input
                type="text"
                value={formData.purpose.en}
                onChange={(e) => handleInputChange('purpose', e.target.value, 'en')}
                placeholder="e.g., Water Bill Payment"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Purpose - Marathi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose (What is this QR for?) - Marathi
              </label>
              <input
                type="text"
                value={formData.purpose.mr}
                onChange={(e) => handleInputChange('purpose', e.target.value, 'mr')}
                placeholder="e.g., पाणी बिल पेमेंट"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Purpose - Hindi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose (What is this QR for?) - Hindi
              </label>
              <input
                type="text"
                value={formData.purpose.hi}
                onChange={(e) => handleInputChange('purpose', e.target.value, 'hi')}
                placeholder="e.g., पानी बिल भुगतान"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description - English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description - English
              </label>
              <textarea
                value={formData.description.en}
                onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                placeholder="Additional description (optional)"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description - Marathi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description - Marathi
              </label>
              <textarea
                value={formData.description.mr}
                onChange={(e) => handleInputChange('description', e.target.value, 'mr')}
                placeholder="अतिरिक्त वर्णन (वैकल्पिक)"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description - Hindi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description - Hindi
              </label>
              <textarea
                value={formData.description.hi}
                onChange={(e) => handleInputChange('description', e.target.value, 'hi')}
                placeholder="अतिरिक्त विवरण (वैकल्पिक)"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Is Active */}
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Active (Show on website)</span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
            >
              {editingId ? 'Update' : 'Create'} QR Code
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* QR Codes List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QR Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {qrCodes.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No QR codes found. Add one to get started.
                </td>
              </tr>
            ) : (
              qrCodes.map((qr) => (
                <tr key={qr.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {qr.imageUrl ? (
                      <img
                        src={api.getImage(qr.imageId)}
                        alt="QR Code"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {qr.purpose?.mr || qr.purpose?.en || 'N/A'}
                    </div>
                    {qr.description?.mr && (
                      <div className="text-xs text-gray-500">{qr.description.mr}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {qr.price ? `₹${qr.price}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        qr.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {qr.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(qr)}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(qr.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QRCodeEditor;

