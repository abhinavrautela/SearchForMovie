import {  useState } from 'react'
import { Actor } from '../Models/Actor'

const AvatarCard = ({ CastDetail }: { CastDetail: Actor[] }) => {
  const [toggalCard, setToggalCard] = useState(false)
  return (
    <div className='flex -space-x-1 mx-auto'>
      {CastDetail.map((e, i) => {
     if(i < 3) return (<div>
      {e.image ? <img className='h-10 w-10 rounded-full ring-1 ring-gray-400' src={e.image?.medium} /> : 
      <h5 className='h-10 w-10 rounded-full ring-1 ring-gray-400 flex justify-center items-center font-bold text-gray-800 bg-gray-200'>{e.name.split("").splice(0,2)}</h5> }
      </div>
      )
     if(i == 3) return  <div className="h-10 w-10 rounded-full ring-1 ring-gray-400 bg-gray-200 text-center  text-sm font-serif text-gray-500 relative cursor-pointer" onClick={() => setToggalCard(!toggalCard)}>
      <h1 className='mt-2'>+{CastDetail.length - 3}</h1>
      {toggalCard && <div id='scrollbar-hide' className={`absolute w-max p-2 space-y-2 bg-black/95  translate-y-4 ml-3  rounded-lg border-2 border-stone-600 shadow-md shadow-gray-1000 overflow-y-scroll ${CastDetail.length < 7 ? "h-auto" : "h-96"}`}>
           {CastDetail.map(e =>
          <div className='flex items-center gap-2'>
             {e.image ? <img className='h-8 w-8 rounded-full ring-1 ring-gray-400' src={e.image.medium} /> : 
             <h5 className='h-8 w-8 rounded-full ring-1 ring-gray-400 text-sm flex justify-center items-center font-semibold text-gray-300'>{e.name.split("").splice(0,2)}</h5>}
            <h1 className='text-sm font-mono tracking-tighter text-gray-50'>{e.name}</h1>
          </div>)}
        </div>}
     </div>
    })
  }
    </div>
  )
}

export default AvatarCard