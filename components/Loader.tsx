export const Loader = () => {
  return (
    <div className="w-full h-screen pt-20 flex justify-center">
      {/* <div className="animate-ping w-16 h-16 rounded-full loader"></div> */}
      {/* <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
          <div className="bg-black bg-opacity-20 rounded-full">
            <div className="w-24 h-24 rounded-full"></div>
          </div>
        </div>
      </div> */}
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-800" />
    </div>
  );
};
