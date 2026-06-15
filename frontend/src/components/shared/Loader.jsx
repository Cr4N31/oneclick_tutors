import oneclickIcon from '../../../assets/imgs/ONECLICK-TUTOR ASSEST-03.png'

function Loader({ fullScreen = true }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 bg-white ${fullScreen ? 'min-h-screen' : 'py-12'}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 border-2 border-[#3D0A4F]/10 border-t-[#E87722] rounded-full animate-spin" />
        <img
          src={oneclickIcon}
          alt="Oneclick Tutors"
          className="w-10 h-10 animate-pulse"
        />
      </div>
      <p className="text-[#3D0A4F]/40 text-xs tracking-widest uppercase font-semibold">
        Loading...
      </p>
    </div>
  )
}

export default Loader