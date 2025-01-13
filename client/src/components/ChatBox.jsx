import { useRef, useState } from "react";
import { getNavigation, getRetriver } from "../services/RecommendationService";
import Loading from "./Loading";

export const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("/search"); 
  const [inputValue, setInputValue] = useState(""); 
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (query) => {
    console.log(query);
    
    if (!query) return;
    let func = null;
    if (command === "/search") {
      func = getRetriver;
    } else if (command === "/navigate") {
      func = getNavigation;
    }
    setIsLoading(true);
    const data = await func(query);
    setIsLoading(false);
    console.log(data);
  }

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-5 right-5 z-50 bg-lime-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-300 transition duration-300"
          onClick={handleClickOpen}
        >
          Chat
        </button>
      )}
      {open && (
        <div className="fixed bottom-8 right-8 max-w-lg bg-white min-w-[480px] rounded-xl shadow-lg p-6 space-y-6 z-50">
          <div className="min-h-[320px]">
            <div className="flex justify-between">
              <div className="text-xl font-semibold text-gray-700">Chat box</div>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-800 text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
            <div className="space-x-4 mt-2">
              <button
                onClick={() => {
                  setCommand("/search");
                  inputRef.current.focus();
                }}
                className="bg-blue-500 text-white px-6 py-1 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setCommand("/navigate");
                  inputRef.current.focus();
                }}
                className="bg-green-500 text-white px-6 py-1 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Navigate
              </button>
            </div>
            {isLoading && <Loading />}
          </div>

          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-600">
              Enter Prompt:
            </label>
            <div className="relative w-full mt-2">
              <div
                className="absolute mt-[9px] left-0 flex items-center px-2 text-blue-500 font-medium pointer-events-none"
              >
                {command}
              </div>
              <textarea
                type="text"
                ref={inputRef}
                id="userInput"
                name="userInput"
                className="w-full pl-[calc(1em+4rem)] pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Type here..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  e.key === "Enter" && onSubmit(`${command} ${inputValue}`);
                }}
                autoFocus
                rows={1}
              />
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  onClick={() => onSubmit(`${inputValue}`)}
                  disabled={isLoading}
                >
                  &gt;
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
