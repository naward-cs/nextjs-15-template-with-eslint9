export const TailwindIndicator = () => {
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-black p-3 font-mono text-white shadow-md dark:border dark:border-slate-500 dark:bg-slate-100 dark:text-slate-500">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="3xl:hidden hidden 2xl:block">2xl</div>
      <div className="3xl:block hidden">3xl</div>
    </div>
  )
}
