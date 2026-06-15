import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, FileText } from 'lucide-react';
import Loader from '../../../../user/shared/Loader';

function Viewer() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/viewer')
      .then(res => res.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const toggle = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return (
    <Loader/>
  );

  if (courses.length === 0) return (
    <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
      No courses uploaded yet.
    </div>
  );

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-[15px] font-semibold text-gray-900 mb-6">
        Course Library — {courses.length} course{courses.length !== 1 ? 's' : ''}
      </h2>

      <div className="flex flex-col gap-3">
        {courses.map(course => (
          <div key={course.id} className="border border-gray-100 rounded-xl overflow-hidden">

            {/* Course row */}
            <button
              onClick={() => toggle(course.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <BookOpen size={15} className="text-[#E87722] flex-shrink-0" />
              <div className="flex-1">
                <span className="text-[13px] font-semibold text-gray-900">{course.code}</span>
                <span className="text-[12px] text-gray-400 ml-2">{course.title}</span>
              </div>
              <span className="text-[11px] text-gray-300 mr-2">
                {course.modules.length} modules · {course.modules.reduce((a, m) => a + m.units.length, 0)} units
              </span>
              {expanded[course.id]
                ? <ChevronDown size={14} className="text-gray-300" />
                : <ChevronRight size={14} className="text-gray-300" />}
            </button>

            {/* Modules */}
            {expanded[course.id] && (
              <div className="border-t border-gray-100">
                {course.modules.map(mod => (
                  <div key={mod.id}>

                    {/* Module row */}
                    <button
                      onClick={() => toggle(mod.id)}
                      className="w-full flex items-center gap-3 px-6 py-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50"
                    >
                      <div className="flex-1 text-[12px] font-medium text-gray-700">
                        Module {mod.module_number}
                      </div>
                      <span className="text-[11px] text-gray-300 mr-2">
                        {mod.units.length} units
                      </span>
                      {expanded[mod.id]
                        ? <ChevronDown size={13} className="text-gray-300" />
                        : <ChevronRight size={13} className="text-gray-300" />}
                    </button>

                    {/* Units */}
                    {expanded[mod.id] && (
                      <div className="bg-gray-50">
                        {mod.units.map(unit => (
                          <div
                            key={unit.id}
                            className="flex items-center gap-3 px-8 py-2 border-b border-gray-100 last:border-0"
                          >
                            <FileText size={12} className="text-gray-300 flex-shrink-0" />
                            <span className="text-[12px] text-gray-600 flex-1">
                              Unit {unit.unit_number} — {unit.title}
                            </span>
                            <span className="text-[11px] text-gray-300">
                              {(unit.chars / 1000).toFixed(1)}k chars
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Viewer;