const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Video } = require("../models");


const getVideoById = async (id)=>{
  const video= await Video.findById(id);

  if(!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with current id");
  }
  return video;
};

const getRatings = async (rating) => {
  const ratings = ["Anyone", "7+", "12+", "16+", "18+"];
  if (rating === "All") {
    return ratings;
  }

  const index = ratings.indexOf(rating);
  console.log("sliced:", ratings.slice(index));
  return ratings.slice(index);
};


const sortVideo = async (videos, sortBy) => {
  return videos.sort((v1, v2) => {
    const x = sortBy === "releaseDate" ? new Date(v1[sortBy]) : v1[sortBy];
    const y = sortBy === "releaseDate" ? new Date(v2[sortBy]) : v2[sortBy];
    return y - x;
  });
};


const getVideos = async (title, genres, contentRating, sort) => {
  console.log("title:",title, "sort:",sort, "genres:",genres , "contentRating:", contentRating);
  const titleQuery ={title:{$regex: title,$options: "i" }};
  let genreQuery ={ genre: { $in:genres}};
  if (genres == "All") genreQuery ={};
  const ratingArrays = await getRatings(contentRating);
  const ratingQuery = { contentRating: { $in: ratingArrays } };
  let videos = await Video.find({
    ...titleQuery,
    ...genreQuery,
    ...ratingQuery,
  });
  const sortedvideos =await sortVideo(videos, sort);
  return sortedvideos;
};

const addVideo = async (video) => {
  const res = await Video.create(video);
  return res;
};

const updateVote = async (id, vote, change) => {
  const videoParams =await Video.findById(id);
  if (!videoParams){
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  if (vote == "upVote") {
    if (change == "increase") videoParams.votes.upVotes +=1;
    else {
      videoParams.votes.upVotes -= 1;
      videoParams.votes.upVotes =Math.max(videoParams.votes.upVotes,0);
    }
  } else {
    if (change=="increase")videoParams.votes.downVotes +=1;
    else {
      videoParams.votes.downVotes -= 1;
      videoParams.votes.downVotes=Math.max(videoParams.votes.downVotes,0);
    }
  }
  await videoParams.save();
};

const updateView = async (id) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  video.viewCount += 1;
  await video.save();
};

module.exports = {
  getVideoById,
  getVideos,
  addVideo,
  updateVote,
  updateView,
};