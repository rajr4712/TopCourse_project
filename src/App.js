import React from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards"
import Filter from "./components/Filter"
import { apiUrl, filterData  } from "./data";
import { useState,useEffect } from "react";
import Spinner from "./components/Spinner";
import {toast} from "react-toastify"; 


const App = () => { 
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);  //categoruy is course category heading .


  //Async function create for Api call
  async function fetchData() {
    setLoading(true);                                 //Api se course ka data jab tak nhi aaye loading(Spinner) show
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      ///output -> 
      setCourses(output.data);                       //Api call se output aane k baad courses variable me set loc12
    }
    catch(error) {
        toast.error("Network me koi dikkat hai");
    }
    setLoading(false);                            //After render data on ui loading not show so false pass
  }

  //call a fetchData function by use of useEffect
  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }

    {/*loc54:if loading true spinner show if not course and catrgory of course show*/}
        </div>
      </div>


    </div>
  );
};

export default App;
