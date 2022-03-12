/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Header() {
  const [hidden, sethidden] = useState("");

  return (
    <div
      className={`bg-indigo-600 ${hidden} `}
      style={{
        marginBottom: "1rem",
      }}
    >
      <div className="max-w-7xl mx-auto py-1 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
              <SpeakerphoneIcon
                className="h-4 w-4 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium font-defonts text-sm text-white truncate">
              <span className="md:hidden">Contribute to our Github repository! </span>
              <span className="hidden md:inline">
                Feel free to contribute to our Github repository!🤝
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="https://github.com/shubham-thorat/sigma-problem-set.git"
              target="_blank"
              className="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 font-defonts bg-white hover:bg-indigo-50"
            >
              Github
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex px-2 py-1 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={() => sethidden("hidden")}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
