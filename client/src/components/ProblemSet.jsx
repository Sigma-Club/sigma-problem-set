import React, { useState, useEffect } from "react";
import Badge from "./Badge.jsx";
import axios from "axios";
import facts from "./facts.json";

const ProblemSet = () => {
  const [problems, setproblems] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchFact = () => {
    let index = Math.floor(Math.random() * facts.facts.length);
    return `"${facts.facts[index].content}"`;
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL)
      .then((res) => {
        let list = res.data.map((element) => {
          return {
            key: element._id,
            problem_name: element.problem_name,
            problem_link: element.problem_link,
            tags: element.tags,
          };
        });
        setproblems(list);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div class="text-center">
          <svg
            role="status"
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>

          <h3 className="font-defonts py-2 text-center text-gray-500 font-semibold italic fact_card">
            {fetchFact()}
          </h3>
        </div>
      ) : (
        <div className="-my-2 overflow-x-auto md:-mx-6 lg:-mx-8 w-5/6 md:w-3/5 font-defonts">
          <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 scale-0.5 sm:scale-1">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sl.No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm sm:text-xs text-right md:text-left  font-medium text-gray-500 uppercase tracking-wider whitespace-normal"
                    >
                      Problems
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center sm:text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block"
                    >
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {problems?.map((problem, index) => (
                    <tr key={problem.key} className="hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm md:text-md  font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-md text-right md:text-left font-bold">
                          <a
                            href={problem.problem_link}
                            className="text-sm md:text-md text-indigo-700 hover:underline"
                            target="_blank"
                          >
                            {" "}
                            {problem.problem_name}{" "}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  badge_container hidden md:flex">
                        {problem.tags.map((e, index) => {
                          return <Badge tag={e} key={index} />;
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="text-center text-xs font-medium py-5 bg-gray-50 text-gray-500 uppercase tracking-wider">
                ©️Sigma Team NITA
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemSet;
