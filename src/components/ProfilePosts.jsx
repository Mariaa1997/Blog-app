/* eslint-disable react/prop-types */
import { IF } from '../utilities/url';

const ProfilePost = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 p-8 rounded-md">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center overflow-hidden rounded-md">
        <img src={IF + post.photo} alt="" className="h-full w-full object-cover rounded-md transition-transform transform hover:scale-105 duration-300" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-2xl font-bold md:mb-2 mb-1 text-pink-800">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-md md:text-lg text-purple-800">{post.desc.slice(0, 200) + " ...there's more!!"}</p>
      </div>
    </div>
  );
};

export default ProfilePost;
