import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Skeletons = () => (
  <div className="text-center w-60">
    <div className="mx-auto my-4 w-52">
      <Skeleton height={30} width={200} />
      <Skeleton height={200} width={200} className="my-8" />
      <Skeleton height={20} />
    </div>
  </div>
)
