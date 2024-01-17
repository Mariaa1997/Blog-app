const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full text-white text-center text-2xl font-bold mb-4 animate-bounce">
      <p className="text-white text-2xl font-bold animate-bounce">Contact Us: Blog@email.com</p>
      </div>
      <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 md:px-[500] flex flex-col md:flex-row space-y-4 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex flex-col text-white md:mr-8">
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Education
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Discovery
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Science
          </p>
        </div>
        <div className="flex flex-col text-white">
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Music
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Art
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Recent Posts
          </p>
        </div>
        <div className="flex flex-col text-white">
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Weather
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            About Us
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Sports
          </p>
          <p className="text-pink-200 bg-blue-500 rounded-full px-4 py-2 mb-2">
            Fashion
          </p>
        </div>
      </div>
      <p className="py-2 pb-2 text-center text-white bg-gradient-to-r from-pink-500 to-purple-500 transition duration-300 ease-in-out transform hover:scale-105">
        All rights reserved to @Aguilar 2024
      </p>
    </>
  );
};

export default Footer;
