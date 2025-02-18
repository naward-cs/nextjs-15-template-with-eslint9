import {env} from '@/configs/env'

// import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import {TailwindIndicator} from './tailwind-size-indicator'

export const DevUItools = () => {
  if (env.NODE_ENV === 'production') return null
  return (
    <div className="absolute bottom-4 right-4 flex flex-row items-center space-x-14">
      <TailwindIndicator />
      {/* uncomment if using react query */}
      {/* <ReactQueryDevtools /> */}
    </div>
  )
}
