
export const UpdateButton = ({ onClick, isLoading, label = "Update" }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
        >
            {isLoading ? "Updating..." : label}
        </button>
    );
};