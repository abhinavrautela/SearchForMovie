import {  useState } from 'react'
import { Actor } from '../Models/Actor'

const AvatarCard = ({ CastDetail }: { CastDetail: Actor[] }) => {
  const [toggalCard, setToggalCard] = useState(false)
  return (
    <div className='flex -space-x-1 mx-auto'>
      {CastDetail.map((e, i) => {
     if(i < 3) return <img className="h-7 w-7 rounded-full ring-1 ring-gray-200" src={e.image ? e.image.medium : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"} /> 
     if(i == 3) return  <div className="h-7 w-7 rounded-full ring-1 ring-gray-400 bg-gray-200 text-center  text-sm font-serif text-gray-500 relative cursor-pointer" onClick={() => setToggalCard(!toggalCard)}>
      <h1 className='mt-0.5'>+{CastDetail.length - 3}</h1>
      {toggalCard && <div id='scrollbar-hide' className={`absolute w-max p-2 space-y-2 bg-black/95  translate-y-2 ml-2  rounded-lg border-2 border-stone-600 shadow-md shadow-gray-700 overflow-y-scroll ${CastDetail.length < 10 ? "h-auto" : "h-72"}`}>
           {CastDetail.map(e =>
          <div className='flex items-center gap-2'>
             <img className='h-5 w-5 rounded-full ring-1 ring-gray-400' src={e.image ? e.image.medium : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"} />
            <h1 className='text-xs font-mono tracking-tighter text-gray-50'>{e.name}</h1>
          </div>)}
        </div>}
     </div>
    })
  }
    </div>
  )
}

export default AvatarCard