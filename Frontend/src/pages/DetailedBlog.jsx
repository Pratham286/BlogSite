
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedBlogCard from "../component/DetailedBlogCard";

const DetailedBlog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get("id");
  const [blogDetails, setBlogDetails] = useState();


  return <DetailedBlogCard blogDetails={blogDetails} setBlogDetails={setBlogDetails}/>
};

export default DetailedBlog;
