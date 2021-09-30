import { ChevronRightIcon } from "@heroicons/react/solid";
import { BookOpenIcon, CheckIcon, DesktopComputerIcon, DocumentTextIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import { HeadSeo } from "@components/seo/head-seo";

const links = [
  {
    title: "Home",
    description: "Go back to the gatego landing page",
    icon: DocumentTextIcon,
    href: "https://gatego.io",
  },
  {
    title: "Dashboard",
    description: "Go to your gatego dashboard",
    icon: DesktopComputerIcon,
    href: "https://api.docs.cal.com",
  },
  {
    title: "Blog",
    description: "Read our latest news and articles",
    icon: BookOpenIcon,
    href: "https://blog.gatego.io",
  },
];

export default function Custom404() {
  const router = useRouter();
  const username = router.asPath.replace("%20", "-");

  const isEventType404 = router.asPath.includes("/event-types");

  return (
    <>
      <HeadSeo
        title="404: This page could not be found."
        description="404: This page could not be found."
        nextSeoProps={{
          nofollow: true,
          noindex: true,
        }}
      />
      <div className="min-h-screen px-4 bg-white">
        <main className="max-w-xl pt-16 pb-6 mx-auto sm:pt-24">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-black uppercase">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 font-cal sm:text-5xl">
              This page does not exist.
            </h1>
            <span className="inline-block mt-2 text-lg ">
              Check for spelling mistakes or go back to the previous page.
            </span>
          </div>
          <div className="mt-12">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Popular pages</h2>

            <ul role="list" className="mt-4 border-gray-200 divide-y divide-gray-200">
              {links.map((link, linkIdx) => (
                <li key={linkIdx} className="px-4 py-2">
                  <Link href={link.href}>
                    <a className="relative flex items-start py-6 space-x-4">
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50">
                          <link.icon className="w-6 h-6 text-gray-700" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900">
                          <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {link.title}
                          </span>
                        </h3>
                        <p className="text-base text-gray-500">{link.description}</p>
                      </div>
                      <div className="self-center flex-shrink-0">
                        <ChevronRightIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/">
                <a className="text-base font-medium text-black hover:text-gray-500">
                  Or go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
