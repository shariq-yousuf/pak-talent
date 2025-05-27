import { Link } from 'react-router'
import { Button } from '../ui/button'

const HomeScreen = () => {
  return (
    <main className="flex max-w-7xl items-center justify-center min-h-dvh p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="md:text-8xl text-4xl text-center">Pak Hunt</h1>
        <p className="text-center text-slate-400 text-lg max-w-3xl">
          PakHunt is a platform that connects job seekers and employers across
          Pakistan. Whether you're looking for your next career opportunity or
          searching for the right talent, PakHunt helps bridge the gap with
          verified listings, and a simple application process.
        </p>

        <div className="flex gap-4 items-center mt-4">
          <Link to={'/signup?role=candidate'}>
            <Button className="font-semibold text-lg cursor-pointer">
              Register as Candidate
            </Button>
          </Link>
          <Link to={'/signup?role=employer'}>
            <Button
              variant={'secondary'}
              className="font-semibold text-lg cursor-pointer"
            >
              Register as Employer
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomeScreen
