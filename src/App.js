import React, { useEffect, useState } from "react";
import Navbar  from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import  {apiUrl,filterData} from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {

  const [courses,setCourses] = useState(null);

  const [loading ,setLoading] = useState(true);

  async function fetchData() {

    setLoading(true);
    try{

      let response = await fetch(apiUrl);
      let output = await response.json();
      
      setCourses(output.data);

    }
    catch(error){ 

      toast.error("Something went wrong")

    }
    setLoading(false);
  }

  useEffect( ()=> { 
    fetchData();
  },[])


  return(
    <div className="min-h-screen flex flex-col">

      <div> 
        <Navbar />  
      </div>

      <div className="bg-bgDark2">
            
          <div> 
            <Filter filterData = {filterData} />  
          </div>

          <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center">  
              {
                loading ? (<Spinner/>) : (<Cards  courses = {courses}/>)
              };
          </div>
      </div>


      
    </div>
  )   
};

export default App;


/**
 * If we dont add spinner and directly just pust cards component then the code breaks with error -
 * "can not convert undefined or null to object"
 * This is becuase we are using api call to fetch the data and until the data is being fetched, the
 * value of courses is set to null and we calling Object.values... on null so we are getting the error
 * If we put [] empty array instead of null then error can resolved.
 * Better is we are adding loader on screen until we get data
 */