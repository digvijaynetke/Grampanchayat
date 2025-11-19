const FloatingComplaintButton = ({ onOpenComplaint }) => {
  return (
    <button
      onClick={onOpenComplaint}
      className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-40 flex items-center gap-2"
      aria-label="तक्रार नोंदवा"
    >
      <span className="text-lg font-semibold">तक्रार नोंदवा</span>
    </button>
  );
};

export default FloatingComplaintButton;
