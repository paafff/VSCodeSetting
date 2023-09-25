import React from 'react';

const GetMeCard = () => {
  return (
    <div className="max-w-lg mx-auto p-4 md:p-8 lg:max-w-xl bg-white rounded-xl dark:bg-blue-800 shadow-lg transform duration-200 easy-in-out mt-12">
 
      <div className="flex justify-start px-5 mt-12 mb-5">
        <span className="block relative h-24 w-24 md:h-32 md:w-32 pt-5">
          <img
            alt="Photo by aldi sigun on Unsplash"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            className="mx-auto object-cover rounded-full h-24 w-24 md:h-32 md:w-32 bg-white p-1"
          />
        </span>
      </div>
      <div>
        <div className="px-4 md:px-7 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-gray-300">Beth J. Greene</h2>
          <p className="text-sm md:text-base text-gray-400 mt-2 dark:text-gray-400">Illustrator</p>
          <p className="text-xs md:text-base mt-2 text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores molestiae vitae odio non commodi
            itaque quisquam incidunt doloribus fugit nesciunt.
          </p>
          <div className="justify-center px-2 md:px-4 py-1 md:py-2 cursor-pointer bg-green-900 max-w-min mx-auto mt-4 md:mt-8 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
            bethgreene@gmail.com
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 md:mt-8">
            { /* Icons remain the same */ }
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMeCard;
