import axios from "axios";
import { GetServerSideProps } from "next";
import Page from "../components/page";
import { Job } from "../models/job";
import { JOB_STATUS_ICONS, JOB_STATUS_TEXT } from "../models/_job";

export default function Home({ jobs }: { jobs: Job[] | null | undefined }) {
  return (
    <Page handleNavbar={true}>
      <ul className="py-3 space-y-3">
        <div className="flex flex-col space-y-2">
          <h4 className="text-3xl">Runners</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-nav-pink p-5 h-40 rounded-lg shadow-md border border-[#1a191a]">
              <h5 className="text-clip overflow-hidden text-lg font-thin text-white">FOX_RUNNER_US_EAST</h5>
              <div className="flex flex-row items-center">
                {JOB_STATUS_ICONS[3]}
                <span>Online</span>
              </div>
              <div className="mt-2">
                <h6 className="text-md font-thin text-white">Current Job</h6>
                <a className="text-orange-500 hover:text-orange-700 hover:cursor-pointer text-lg text-white" href={`/jobs/434`}>#434</a>
              </div>
            </div>
            <div className="bg-nav-pink p-5 h-40 rounded-lg shadow-md border border-[#1a191a]">
              <h5 className="text-clip overflow-hidden text-lg font-thin text-white">FOX_RUNNER_US_WEST</h5>
              <div className="flex flex-row items-center">
                {JOB_STATUS_ICONS[2]}
                <span>Offline</span>
              </div>
              <div className="mt-2">
                <h6 className="text-md font-thin text-white">Current Job</h6>
                <a className="text-orange-500 hover:text-orange-700 hover:cursor-pointer text-lg text-white" href={`/jobs/434`}>#465</a>
              </div>
            </div>
            <div className="bg-nav-pink p-5 h-40 rounded-lg shadow-md border border-[#1a191a]">
              <h5 className="text-clip overflow-hidden text-lg font-thin text-white">FOX_RUNNER_US_NORTH</h5>
              <div className="flex flex-row items-center">
                {JOB_STATUS_ICONS[2]}
                <span>Offline</span>
              </div>
              <div className="mt-2">
                <h6 className="text-md font-thin text-white">Current Job</h6>
                <a className="text-orange-500 hover:text-orange-700 hover:cursor-pointer text-lg text-white" href={`/jobs/434`}>#43235234</a>
              </div>
            </div>
            <div className="bg-nav-pink p-5 h-40 rounded-lg shadow-md border border-[#1a191a]">
              <h5 className="text-clip overflow-hidden text-lg font-thin text-white">FOX_RUNNER_US_NORTH_WEST</h5>
              <div className="flex flex-row items-center">
                {JOB_STATUS_ICONS[1]}
                <span>Waiting for Job</span>
              </div>
              <div className="mt-2">
                <h6 className="text-md font-thin text-white">Current Job</h6>
                {/* <a className="text-orange-500 hover:text-orange-700 hover:cursor-pointer text-lg text-white" href={`/jobs/434`}>#343424234</a> */}
              </div>
            </div>
          </div>
        </div>
        {jobs == null || jobs == undefined ?
          null
          :
          <div className="flex flex-col space-y-2">
            <h4 className="text-3xl">Recent Jobs</h4>
            <ul className="flex flex-col space-y-2">
              {jobs.map((job, idx) => (
                <li key={idx} className="p-3 px-5 rounded-lg shadow-sm border border-[#1a191a] flex flex-row items-center justify-between">
                  <ul className="flex flex-col space-y-2">
                    <div className="flex flex-row space-x-2">
                      <a className="hover:text-orange-500  hover:cursor-pointer text-lg font-thin text-white" href={`/jobs/${job.id}`}>#{job.id}</a>
                    </div>
                    <ul className="flex flex-row space-x-2">
                      <div className="flex flex-row items-center space-x-2">
                        {JOB_STATUS_ICONS[job.status]}
                        {JOB_STATUS_TEXT[job.status]}
                      </div>
                      <div className="flex flex-row items-center italic font-base text-sm text-white/50 align-bottom">
                        Runner: {job.assigned_runner}
                      </div>
                      <div className="flex flex-row items-center italic font-base text-sm text-white/50">
                        Trigger: {job.triggered_by}
                      </div>
                    </ul>
                  </ul>

                  <button onClick={() => window.location.href = `/jobs/${job.id}`} className="px-4 py-1 border border-orange-500 text-orange-500 transition-all duration-200 hover:bg-orange-500 hover:text-white rounded-[0.250rem]">View Job</button>
                </li>
              ))}
              <a className="text-white/50 hover:text-orange-500 text-center w-full" href="/jobs?page=1&per_page=5">View more</a>
            </ul>
          </div>
        }
      </ul>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  let jobs: any[] | null | undefined = null;
  await axios.request(
    {
      withCredentials: true, method: "get", url: `jobs/search?recent=true&per_page=4`, baseURL: process.env.NEXT_PUBLIC_API_BASE,
    }
  ).then((response) => {
    jobs = response.data;
  }).catch(err => {
    console.log(err);
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  });


  return {
    props: {
      jobs: jobs
    }
  }
}