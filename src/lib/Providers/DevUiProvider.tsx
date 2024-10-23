import {env} from '@/configs/env'

const TailwindIndicator = () => {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex size-8 items-center justify-center rounded-full border p-3 font-mono text-slate-500 shadow-md">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block">md</div>
      {/* <div className="hidden lg:block xl:hidden ">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div> */}
    </div>
  )
}

const DevUIProvider = () => {
  if (env.NODE_ENV === 'production') return null
  return (
    <>
      <TailwindIndicator />
    </>
  )
}

export default DevUIProvider
