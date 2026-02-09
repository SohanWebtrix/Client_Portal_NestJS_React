// src/components/Spinner.jsx
export default function Spinner() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>Sending...</span>
    </div>
  );
}
