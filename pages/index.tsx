import type { NextPage } from 'next'
import Navbar from '../components/navbar'

const Home: NextPage = () => {
  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <Navbar/>
    </div>
  )
}

export default Home
