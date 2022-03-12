import React, { useState, useEffect } from "react";
import Badge from "./Badge.jsx";
import axios from "axios";

const ProblemSet = () => {
  const [problems, setproblems] = useState([]);

  useEffect(() => {
    axios
      .get("https://sigma-problem-set.herokuapp.com")
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="-my-2 overflow-x-auto md:-mx-6 lg:-mx-8 w-3/5 font-defonts">
      <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sl.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Problems
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                      <div className="text-md font-medium text-gray-900">
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    <div className="text-md  text-left font-bold">
                      <a
                        href={problem.problem_link}
                        className="text-md text-indigo-700 hover:underline"
                        target="_blank"
                      >
                        {" "}
                        {problem.problem_name}{" "}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left badge_container">
                    {problem.tags.map((e, index) => {
                      return <Badge tag={e} key={index} />;
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-center text-xs font-medium py-3 bg-gray-50 text-gray-500 uppercase tracking-wider">
            ©️Sigma Team NITA
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;
