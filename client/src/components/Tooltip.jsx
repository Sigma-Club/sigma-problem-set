const ToolTip = () => {
  return (
    <div className="hidden md:block fixed bottom-8 right-8 z-40">
      <div class="relative flex flex-col items-center group">
        <div className="p-2 rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4f46e5"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
          <span class="relative z-10 p-3 text-xs leading-none text-black whitespace-no-wrap bg-white font-defonts shadow-lg">
            Use <span className="font-bold italic">Dark Reader</span> extension for dark mode experience!
          </span>
          <div class="w-3 h-3 rotate-45"></div>
        </div>
      </div>
      {/* <!-- Component End  --> */}
    </div>
  );
};

export default ToolTip;
