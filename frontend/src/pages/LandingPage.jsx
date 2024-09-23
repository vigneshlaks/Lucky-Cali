import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
    <section className="text-black body-font lg:pt-20">
      <div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
        <div className="flex flex-col w-full mb-2 text-left md:text-center ">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl">
            <span>Take Your Skills </span>
            <br className="hidden lg:block"></br>
            To The Next Level
          </h1>
          <br></br>
          <p className="mx-auto  text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
            First of its Kind LLM Based Calisthenics Training Software 
          </p>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={24} redraw={false}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white">
                  <CountUp end={52} redraw={false}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">LLM Requests</p>
              </div>
              <div className="p-4 sm:w-1/3 w-1/2">
                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
                  <CountUp end={6} redraw={false}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">Contests</p>
              </div>
            </div>
          </div>
        </section>
    
        
        <div className="container px-5 py-10 mx-auto flex flex-wrap">
        <div className="container px-5 py-10 mx-auto flex flex-wrap lg:flex-nowrap gap-6">
            {/* First Card */}
            <div className="border border-gray-200 dark:border-gray-900 rounded-lg p-6 shadow-md w-full lg:w-1/2 flex flex-col items-center justify-center">
                <div className="flex flex-col flex-wrap -mb-10 lg:text-left text-center items-center">
                <div className="flex flex-col mb-10 items-center">
                    <h1 className="text-white text-4xl title-font font-medium mb-3">
                    Train
                    </h1>
                    <div className="text-center">
                    <h2 className="text-white text-2xl title-font font-medium mb-3">
                        Custom LLM Agent
                    </h2>
                    <p className="leading-relaxed text-lg">
                        Synthesizing insights from 100,000+ calisthenics material
                    </p>
                    </div>
                </div>
                <div className="flex flex-col mb-10 items-center">
                    <div className="text-center">
                    <h2 className="text-white text-2xl title-font font-medium mb-3">
                        Customized Skill Tree
                    </h2>
                    <p className="leading-relaxed text-lg">
                        Curating the top calisthenics resources
                    </p>
                    </div>
                </div>
                <div className="flex flex-col mb-10 items-center">
                    <div className="text-center">
                    <h2 className="text-white text-2xl title-font font-medium mb-3">
                        Community Posts
                    </h2>
                    <p className="leading-relaxed text-lg">
                        Providing quality advice from Peers
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* Second Card */}
            <div className="border border-gray-200 dark:border-gray-900 rounded-lg p-6 shadow-md w-full lg:w-1/2 flex flex-col items-center justify-center">
                <div className="flex flex-col flex-wrap -mb-10 lg:text-left text-center items-center">
                <div className="flex flex-col mb-10 items-center">
                    <h1 className="text-white text-4xl title-font font-medium mb-3">
                    Compete
                    </h1>
                    <div className="text-center">
                    <h2 className="text-white text-2xl title-font font-medium mb-3">
                         Contests
                    </h2>
                    <p className="leading-relaxed text-lg">
                        Compete in week long contests
                    </p>
                    </div>
                </div>
                <div className="flex flex-col mb-10 items-center">
                    <div className="text-center">
                    <h2 className="text-white text-2xl title-font font-medium mb-3">
                        Leaderboard
                    </h2>
                    <p className="leading-relaxed text-lg">
                        Climb the global ranks
                    </p>
                    </div>
                </div>
                <div className="flex flex-col mb-10 items-center">
                    <div className="text-center">
                        <h2 className="text-white text-2xl title-font font-medium mb-3">
                        Feedback
                        </h2>
                        <p className="leading-relaxed text-lg">
                            Receive advice based on submitted skills
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
      </section>
      
    </section>
    <section className="relative pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-10 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Sign up or Explore the Site
            </h1>
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/auth/register"
            >
              <span className="justify-center">Sign Up</span>
            </a>
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/train"
            >
              <span className="justify-center">Train</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
