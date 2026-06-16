import { Upload } from "lucide-react";
import { useRef, useState, useEffect } from 'react'

function UploadComponent() {
  const fileInputRef = useRef(null);
  const [courseCode, setCourseCode] = useState(() => localStorage.getItem('oc_courseCode') || '');
  const [courseTitle, setCourseTitle] = useState(() => localStorage.getItem('oc_courseTitle') || '');
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});

  const handleClick = () => fileInputRef.current.click();

  // Persist course fields
  useEffect(() => {
    localStorage.setItem('oc_courseCode', courseCode);
  }, [courseCode]);

  useEffect(() => {
    localStorage.setItem('oc_courseTitle', courseTitle);
  }, [courseTitle]);

  const handleFiles = (incoming) => {
    setFiles(prev => [...prev, ...Array.from(incoming)]);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  const addToDatabase = async (file, index) => {
    if (!courseCode || !courseTitle) {
      alert('Please enter course code and title first.');
      return;
    }

    setStatus(prev => ({ ...prev, [index]: 'uploading' }));

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('courseCode', courseCode);
    formData.append('courseTitle', courseTitle);

    try {
      const res = await fetch('https://oneclick-tutors-backend.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Response:', data);

      // Only clear on success
      if (res.ok) {
        setStatus(prev => ({ ...prev, [index]: 'done' }));
        // Remove just this file after short delay
        setTimeout(() => {
          setFiles(prev => prev.filter((_, i) => i !== index));
          setStatus(prev => {
            const next = { ...prev };
            delete next[index];
            return next;
          });
        }, 1500);

        // Clear course fields only if all files are done
        setCourseCode('');
        setCourseTitle('');
        localStorage.removeItem('oc_courseCode');
        localStorage.removeItem('oc_courseTitle');
      } else {
        setStatus(prev => ({ ...prev, [index]: 'error' }));
      }
    } catch (err) {
      console.error('Upload failed:', err.message);
      setStatus(prev => ({ ...prev, [index]: 'error' }));
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <section className="flex justify-center items-start pt-[20vh] min-h-screen">
      <div className="w-full max-w-md flex flex-col gap-3">

        {/* Course fields */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Course code e.g. GST101"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#E87722]"
          />
          <input
            type="text"
            placeholder="Course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#E87722]"
          />
        </div>

        {/* Dropzone */}
        <div
          onClick={handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center gap-3 py-12 px-6 border border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
            <Upload size={22} className="text-[#E87722]" />
          </div>
          <div className="text-center">
            <p className="text-[15px] font-medium text-gray-900">Upload your file</p>
            <p className="text-[13px] text-gray-400 mt-0.5">Click to browse or drag and drop</p>
          </div>
          <p className="text-[11px] text-gray-300">PDF files only</p>
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 border border-gray-100 rounded-lg">
                <span className="text-[#E87722] text-sm">PDF</span>
                <span className="text-[13px] text-gray-700 flex-1 truncate">{f.name}</span>
                <span className="text-[12px] text-gray-300">{(f.size / 1024).toFixed(0)} KB</span>
                <button
                  onClick={() => addToDatabase(f, i)}
                  disabled={status[i] === 'uploading' || status[i] === 'done'}
                  className="text-xs text-green-500 hover:text-green-700 mr-2 disabled:opacity-40"
                >
                  {status[i] === 'uploading' ? 'Saving...' : status[i] === 'done' ? 'Saved ✓' : 'Add to Database'}
                </button>
                <button
                  onClick={() => removeFile(i)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default UploadComponent;