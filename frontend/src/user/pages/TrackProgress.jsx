import { useState, useEffect } from 'react'
import API_BASE from '../config'
import QuizHistory from '../components/progress/QuizHistory'
import Proficiency from '../components/progress/Proficiency'
import WeeklyChart from '../components/progress/WeeklyChart'
import Loader from '../shared/Loader'

function TrackProgress({ user }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.id) return

    fetch(`${API_BASE}/api/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setData(data)
      })
      .catch(() => setError('Failed to load progress.'))
      .finally(() => setLoading(false))
  }, [user?.id])

  if (loading) return <Loader fullScreen={false} />

  if (error) return <p className="text-red-500 text-sm">{error}</p>

  if (!data || (data.quiz_history.length === 0 && data.proficiency.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-[#3D0A4F] font-semibold text-lg">No activity yet</p>
        <p className="text-[#3D0A4F]/50 text-sm">Complete a quiz to start tracking your progress.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col mt-24 gap-8" data-aos='fade-up'>
      <div>
        <p className="font-semibold text-[#E87722] text-sm">Your Progress</p>
        <h1 className="text-[#3D0A4F] font-bold text-2xl">Evaluate Progress</h1>
      </div>

      <QuizHistory history={data.quiz_history} />
      <Proficiency proficiency={data.proficiency} />
      <WeeklyChart weekly={data.weekly} />
    </div>
  )
}

export default TrackProgress