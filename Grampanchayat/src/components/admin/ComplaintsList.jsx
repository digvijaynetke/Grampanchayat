import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { hasPermission, PERMISSIONS } from '../../utils/permissions';
import api from '../../config/api';

const ComplaintsList = () => {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, [pagination.page, statusFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.admin.getComplaints(pagination.page, pagination.limit, statusFilter || null);
      if (response.success) {
        setComplaints(response.complaints);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // Check permission
    if (!hasPermission(admin, PERMISSIONS.MANAGE_COMPLAINTS)) {
      alert('You don\'t have permission to update complaint status.');
      return;
    }

    try {
      await api.admin.updateComplaintStatus(id, newStatus);
      fetchComplaints();
      if (selectedComplaint?.id === id) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || colors.pending}`}>
        {status}
      </span>
    );
  };

  if (loading && complaints.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Check permission
  if (!hasPermission(admin, PERMISSIONS.VIEW_COMPLAINTS)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">You don't have permission to view complaints.</p>
      </div>
    );
  }

  const canManageComplaints = hasPermission(admin, PERMISSIONS.MANAGE_COMPLAINTS);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Complaints</h2>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPagination((prev) => ({ ...prev, page: 1 }));
          }}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Complaints List */}
      <div className="space-y-3">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedComplaint(complaint)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                  {getStatusBadge(complaint.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{complaint.message.substring(0, 100)}...</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{complaint.name}</span>
                  <span>{complaint.email}</span>
                  {complaint.phone && <span>{complaint.phone}</span>}
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {canManageComplaints ? (
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              ) : (
                getStatusBadge(complaint.status)
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Complaint Details</h3>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold">Subject:</label>
                <p>{selectedComplaint.subject}</p>
              </div>
              <div>
                <label className="font-semibold">Message:</label>
                <p className="whitespace-pre-wrap">{selectedComplaint.message}</p>
              </div>
              <div>
                <label className="font-semibold">Name:</label>
                <p>{selectedComplaint.name}</p>
              </div>
              <div>
                <label className="font-semibold">Email:</label>
                <p>{selectedComplaint.email}</p>
              </div>
              {selectedComplaint.phone && (
                <div>
                  <label className="font-semibold">Phone:</label>
                  <p>{selectedComplaint.phone}</p>
                </div>
              )}
              <div>
                <label className="font-semibold">Status:</label>
                {canManageComplaints ? (
                  <select
                    value={selectedComplaint.status}
                    onChange={(e) => handleStatusChange(selectedComplaint.id, e.target.value)}
                    className="mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                ) : (
                  <div className="mt-1">{getStatusBadge(selectedComplaint.status)}</div>
                )}
              </div>
              <div>
                <label className="font-semibold">Submitted:</label>
                <p>{new Date(selectedComplaint.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;

