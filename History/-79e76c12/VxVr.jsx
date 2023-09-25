import React from 'react';
import Layout from './Layout';

const Authentication = () => {
  const [isVisible, setVisible] = useState(false);

  let onHideShowClick = () => {
    setVisible(!isVisible);
  };

  return (
    <Layout>
      <>
        <br />
        <br />

        <div className=" flex justify-center items-center   ">
          <div className=" place-items-center flex flex-col md:flex-row justify-evenly w-full max-w-7xl p-4 bg-none  rounded-lg  sm:p-6 md:p-8">
            <img
              className="max-w-md  md:max-w-2xl h-2/4 md:self-start "
              // src={logoauth}
              alt="logoauth"
            />
            <div className="h-1/5 md:pt-0 pt-10 md:self-start  flex flex-col justify-center items-center">
              <div className="">
                <button onClick={onHideShowClick}>
                  <div class=" relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-gray-100 border-2 border-gray-100 hover:border-yellow-600 rounded-full hover:text-gray-100 group hover:bg-yellow-600">
                    <span class="absolute left-0 block w-full h-0 transition-all bg-yellow-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                    <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span class="relative">
                      {' '}
                      {isVisible ? 'Register Form' : 'Login Form'}
                    </span>
                  </div>
                </button>
              </div>
              <br />
              <div className="">
                {isVisible ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Authentication;
