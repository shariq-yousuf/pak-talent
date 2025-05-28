import { Link } from 'react-router'
import { Button } from '../ui/button'

const HomeScreen = () => {
  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center p-4 md:p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-5xl md:text-8xl">Pak Talent</h1>
        <p className="max-w-3xl text-center text-lg text-slate-400">
          Pak Talent is a platform that connects job seekers and employers
          across Pakistan. Whether you're looking for your next career
          opportunity or searching for the right talent, Pak Talent helps bridge
          the gap with verified listings, and a simple application process.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link to={'/signup?role=candidate'}>
            <Button className="cursor-pointer text-lg font-semibold">
              Register as Candidate
            </Button>
          </Link>
          <Link to={'/signup?role=employer'}>
            <Button
              variant={'secondary'}
              className="cursor-pointer text-lg font-semibold"
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
