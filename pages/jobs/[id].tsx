import { GetServerSideProps } from "next";
import Page from "../../components/page";
import axios from "axios";
import { Job } from "../../models/job";
import { JOB_STATUS_ICONS, JOB_STATUS_TEXT } from "../../models/_job";
import { Doughnut } from "react-chartjs-2";

interface JobMeta {
    title: string,
    value: string | null,
    link: string | null,
    icon: any | null
}

export default function SpecificJob({ job }: { job: Job | null | undefined }) {
    const generateJobMeta = (): JobMeta[] => {
        if (job == null || job == undefined) {
            return [{ "title": "Job Was None", "value": "OwO Whats this?", "link": null, "icon": null }];
        }
        let base: JobMeta[] = [
            { "title": "Ran on Runner", "value": job.assigned_runner, "link": null, "icon": null },
            { "title": "Triggered By", "value": job.triggered_by, "link": null, "icon": null },
            {
                "title": "Status", "value": JOB_STATUS_TEXT[job.status], "link": null, "icon": JOB_STATUS_ICONS[job.status]
            }
        ]

        if (job.repo !== null) {
            base = [...base, { "title": "Repository", "link": `https://github.com/${job.repo.owner}/${job.repo.name}`, "value": `${job.repo.owner}/${job.repo.name}`, "icon": null }]
        }
        return base;
    }

    return (
        <Page handleNavbar={true}>
            {job == null || job == undefined ?

                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </>
                :
                <div className="py-3 flex flex-col space-y-2">
                    <h2 className="text-2xl">Job <span className="text-orange-500">#{job.id}</span></h2>
                    <ul className="flex flex-row space-x-2">
                        {generateJobMeta().map((meta) => (
                            <li className="bg-[#1a191a] flex flex-row justify-center items-center divider-x-2 divide-nav-pink/20 rounded-lg shadow-md border border-[#1a191a]">
                                <span className="bg-[#1a191a] py-2 px-2 rounded-l-lg font-bold">
                                    {meta.title}
                                </span>
                                {meta.link == null ?
                                    <p className="h-full flex flex-row items-center justify-center rounded-r-lg px-2 bg-nav-pink font-[300] text-lg">
                                        {meta.icon == null ?
                                            null
                                            :
                                            <span className="mr-1">{meta.icon}</span>
                                        }
                                        {meta.value}
                                    </p>
                                    :
                                    <div className="flex flex-row items-center align-middle h-full rounded-r-lg px-2 bg-nav-pink font-[300] text-lg">
                                        <a className="h-full flex flex-row items-center group justify-center hover:text-orange-500" href={meta.link}>
                                            {meta.value}
                                            <span className="ml-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-orange-500" viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M15.5 2.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V4.06l-6.22 6.22a.75.75 0 1 1-1.06-1.06L19.94 3h-3.69a.75.75 0 0 1-.75-.75Z"></path><path d="M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.25.25 0 0 0-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 0 0 .25-.25v-8.5a.75.75 0 0 1 1.5 0v8.5a1.75 1.75 0 0 1-1.75 1.75H4.25a1.75 1.75 0 0 1-1.75-1.75V4.25Z"></path></svg>
                                            </span>
                                        </a>
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    let job: any | null | undefined = null;

    await axios.request(
        {
            withCredentials: true, method: "get", url: `jobs/${context.query.id}`, baseURL: process.env.NEXT_PUBLIC_API_BASE,
        }
    ).then((response) => {
        job = response.data;
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
            job: job
        }
    }
}