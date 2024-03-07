import React from "react";
import {FcLike} from "react-icons/fc";
import { toast } from "react-toastify";

const Card = (props) =>{
    let course = props.course;
    let likedCourses = props.likedCourses;
    let setLikedCourses = props.setLikedCourses;
    function clickHandler() {
        if (likedCourses.includes(course.id)) {
          //means course if already liked and we need to remove it from likedCourses
          setLikedCourses((prev) => prev.filter((cid) => cid !== course.id));
          toast.warning("Like Removed");
        } else {
          //The course is not already liked so we need to insert it likedCourses array
          if (likedCourses.length === 0) {
            setLikedCourses([course.id]);
          } else {
            setLikedCourses((prev) => [...prev, course.id]);
          }
          toast.success("Liked Successfully");
        }
    }
    
    return (
        <div className="w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden">
      <div>
        <div className="relative">
          <img src={course.image.url} alt="img"></img>
          <div
            className="w-[35px] h-[35px] bg-white rounded-full absolute right-2 bottom-[-12px]
           grid place-items-center"
          >
            <button onClick={clickHandler}>
              {likedCourses.includes(course.id) ? (
                <FcLike fontSize="1.75rem" />
              ) : (
                <FcLike fontSize="1.75rem" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-lg leading-6">
          {course.title}
        </p>
        <p className="mt-2 text-white">
          {course.description.length > 100
            ? course.description.substring(0, 100) + "..."
            : course.description}
        </p>
      </div>
    </div>
    )
}

export default Card ;