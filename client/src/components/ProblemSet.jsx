import React, { useState, useEffect } from "react";
import Badge from "./Badge.jsx";
import axios from "axios";
import facts from "./facts.json";
import { UserAuth } from "../context/AuthContext";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRef } from "react";
import ReactLoading from "react-loading";

const ProblemSet = ({ solved, onDataChange, setsolved }) => {
  const { user } = UserAuth();
  const componentMounted = useRef(true);
  const [problems, setproblems] = useState([]);
  const [loading, setloading] = useState(true);
  const [smloading, setSmLoading] = useState();
  const [keyword, setKeyword] = useState("");
  const [tags, settags] = useState([]);
  const [tagsChecked, settagsChecked] = useState(false);
  const [placeholderString, setplaceholderString] = useState("name");
  const fetchFact = () => {
    let index = Math.floor(Math.random() * facts.facts.length);
    return `"${facts.facts[index].content}"`;
  };

  function getSolvedProblems() {
    const docRef = doc(db, "users-progress", user.uid);
    getDoc(docRef).then((doc) => {
      // console.log(doc.data());
      setsolved(doc.data().solved_problems);
    });
    setSmLoading(false)
  }

  useEffect(async () => {
    //fetch user's solved problems from firebase
    getSolvedProblems();
  }, [user]);

  useEffect(() => {
    //fetch problems from db server
    axios
      .get(process.env.REACT_APP_BACKEND_URL)
      .then((res) => {
        let taglist = [];
        let list = res.data.map((element) => {
          for (let i = 0; i < element.tags.length; i++) {
            taglist.push(element.tags[i]);
          }

          return {
            key: element._id,
            problem_name: element.problem_name,
            problem_link: element.problem_link,
            tags: element.tags,
          };
        });

        let uniquetags = [...new Set(taglist)];
        settags(uniquetags);
        setproblems(list);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isChecked = (key) => {
    return solved[key] === true;
  };

  const make_false = async (key) => {
    setSmLoading(true)
    const docRef = doc(db, "users-progress", user.uid);
    const solved_problems = {...solved}
    solved_problems[key] = false
    try {
      await updateDoc(docRef, {
        solved_problems
      });
      onDataChange(key, false);
    } catch (error) {
      console.log(error);
    }
    setSmLoading(false)
  };
  const make_true = async (key) => {
    setSmLoading(true)
    const docRef = doc(db, "users-progress", user.uid);
    const solved_problems = {...solved}
    solved_problems[key] = true
    try {
      await updateDoc(docRef, {
        solved_problems
      });
      onDataChange(key, true);
    } catch (error) {
      console.log(error);
    }
    setSmLoading(false)
  };

  const handleTagsClick = () => {
    if (tagsChecked) setplaceholderString("name");
    else setplaceholderString("tags");
    settagsChecked(!tagsChecked);
  };

  const filteredProblems = problems.filter((problem) => {
    if (tagsChecked) {
      for (let i = 0; i < problem.tags.length; i++) {
        if (
          problem.tags[i].toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      return false;
    } else {
      return problem.problem_name.toLowerCase().includes(keyword.toLowerCase());
    }
  });

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
        <div className="-my-2 overflow-x-auto md:-mx-6 lg:-mx-8 w-11/12 md:w-3/5 font-defonts">
          <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <input
                type="text"
                id="search-box"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 mb-3 text-center"
                placeholder={`/ Search problems by ${placeholderString}`}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div class="flex items-center ml-2 mb-3 bg-gray-300 py-2.5 sm:py-2 px-3 rounded-md">
                <input
                  onChange={() => handleTagsClick()}
                  id="checkbox-1"
                  aria-describedby="checkbox-1"
                  type="checkbox"
                  class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={tagsChecked}
                />
                <label
                  for="checkbox-1"
                  class="ml-3 text-xs sm:text-sm font-medium text-gray-600 truncate"
                >
                  By tags
                </label>
              </div>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
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
                      className="px-6 py-3 text-sm sm:text-xs text-left  font-medium text-gray-500 uppercase tracking-wider whitespace-normal"
                    >
                      Problems
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center sm:text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block"
                    >
                      Tags
                    </th>
                    {user && (
                      <th
                        scope="col"
                        className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ✔️
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProblems?.map((problem, index) => (
                    <tr key={problem.key} className="hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm md:text-md  font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-md text-left font-bold">
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
                      {user && (
                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-start">
                            {smloading ? (<ReactLoading type="cylon" color="#303F9F" height={'75%'} width={'75%'}/>) : isChecked(problem.key) ? (
                              <input
                                onClick={() => make_false(problem.key)}
                                id="checkbox-1"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={true}
                              />
                            ) : (
                              <input
                                onClick={() => make_true(problem.key)}
                                id="checkbox-1"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={false}
                              />
                            )}
                          </div>
                        </td>
                      )}
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
