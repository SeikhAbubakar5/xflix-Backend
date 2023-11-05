const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");


const getVideoId =catchAsync(async(req, res) =>{
  const videoIdParam= req.params.videoId;
  const videoData= await videoService.getVideoById(videoIdParam);
  res.status(200).send(videoData);
});

const getAllVideos = catchAsync(async (req, res)=> {
  const { title = "",genres = ["All"],contentRating ="All",sortBy= "releaseDate"}=req.query;
  const data =await videoService.getVideos(title, genres, contentRating, sortBy);
  res.status(httpStatus.OK).send({ videos: data });
});


const AddVideo = catchAsync(async (req, res) => {
  let dataParams = await videoService.addVideo(req.body);
  res.status(201).send(dataParams);
});

const updateVote = catchAsync(async (req, res) => {
  const videoId=req.params.videoId;
  const vote=req.body.vote;
  const change =req.body.change;

  await videoService.updateVote(videoId, vote, change);
  res.status(204).send();
});



const updateView = catchAsync(async (req, res) => {
  const videoId =req.params.videoId;
  await videoService.updateView(videoId);
  res.status(204).send();
});


module.exports = {
  getVideoId,
  getAllVideos,
  AddVideo,
  updateVote,
  updateView,
};