import { GetServerSideProps } from "next";
import Page from "../../components/page";
import axios from "axios";
import { Job } from "../../models/job";

const JOB_STATUS_ICONS = [
    <svg xmlns="http://www.w3.org/2000/svg" className="-mr-1" viewBox="0 0 24 24" width="40" height="40" fill="#f59e0b"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" viewBox="0 0 24 24" width="24" height="24" fill="#f97316"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm11.575-4.75a.825.825 0 1 0-1.65 0v5.5c0 .296.159.57.416.716l3.5 2a.825.825 0 0 0 .818-1.432l-3.084-1.763Z"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" viewBox="0 0 24 24" width="24" height="24" fill="#ef4444"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm8.036-4.024a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L12 10.939Z"></path></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" viewBox="0 0 24 24" width="24" height="24" fill="#22c55e"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path></svg>,
];

const JOB_STATUS_TEXT = [
    "Waiting",
    "Running",
    "Failed",
    "Succeeded"
];

export default function SpecificJob({ jobs }: { jobs: Job[] | null | undefined }) {
    return (
        <Page handleNavbar={true}>
            {jobs == null || jobs == undefined ?

                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </>
                :
                <div className="py-3 space-y-3">
                    <h4 className="text-3xl">Showing {jobs.length} jobs</h4>
                    <ul className="flex flex-row space-x-2 justify-center">
                        <input type="text" className="flex-1 bg-nav-pink border border-[#252325] p-2 h-full w-full rounded-md outline-none transition-all duration-200 focus:outline focus:outline-offset-2 focus:outline-orange-500 focus:outline-offset-black" placeholder="Filter" />
                        <button className="flex-1 max-w-max px-4 py-1 bg-orange-500 text-white transition-all duration-200 rounded-[0.250rem] hover:bg-orange-600 active:bg-orange-700">Search</button>
                    </ul>
                    <ul className="flex flex-col space-y-2">
                        {jobs.map((job, idx) => (
                            <li key={idx} className="p-3 px-5 rounded-lg shadow-sm border border-[#1a191a] flex flex-row items-center justify-between">
                                <ul className="flex flex-col space-y-2">
                                    <div className="flex flex-row space-x-2">
                                        <a className="hover:text-orange-500  hover:cursor-pointer text-lg font-thin text-white" href={`/jobs/${job.id}`}>#{job.id}</a>
                                    </div>
                                    <ul className="flex flex-row space-x-2">
                                        <div className="flex flex-row items-center">
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

                                <button onClick={() => window.location.href = `/jobs/${job.id}`} className="px-4 py-1 border border-gray-500 text-gray-500 transition-all duration-200 hover:bg-gray-500 hover:text-white rounded-[0.250rem] active:text-white active:border-gray-600 active:bg-gray-600 ">View Job</button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </Page >
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    let jobs: any[] | null | undefined = null;
    let page = context.query.page;
    let per_page = context.query.per_page;
    await axios.request(
        {
            withCredentials: true, method: "get", url: `jobs/search?page=${page == undefined || page == null ? 0 : page}&per_page=${per_page == undefined || per_page == null ? 5 : per_page}`, baseURL: process.env.NEXT_PUBLIC_API_BASE,
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