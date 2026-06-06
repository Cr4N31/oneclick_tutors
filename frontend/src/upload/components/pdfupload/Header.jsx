import oneclick from '../../../../assets/imgs/ONECLICK-TUTOR ASSEST-02.png'

function Header({ activePage, setActivePage }) {
  const nav = [
    { name: 'Upload', id: '#upload' },
    { name: 'View PDFs', id: '#viewer' },
  ]

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-32" src={oneclick} alt="Oneclick Tutors" />
          <div className="border-l border-gray-200 pl-3">
            <p className="text-base font-semibold text-orange-600 leading-tight">Upload PDF</p>
            <p className="text-xs text-gray-400">Add course materials to Oneclick</p>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
        {nav.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePage(item.id)}
            className={`text-sm font-medium transition-all duration-200 ${
              activePage === item.id
                ? 'text-orange-600 border-b'
                : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            {item.name}
          </button>
        ))}
        </div>
        <div>
          <span className="text-xs bg-orange-100/20 text-orange-600 border border-orange-300 px-3 py-1 rounded-md">
            Admin only
          </span>
        </div>

      </div>
    </header>
  )
}

export default Header