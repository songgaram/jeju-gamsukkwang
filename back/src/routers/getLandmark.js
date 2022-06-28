import { Tour } from "../db/schemas/tour";

import { Router } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// DB에 랜드마크 정보를 넣기 위한 파일. 라우터와 서비스 기능 통합되어 있음.
const getLandmark = Router();

const addLandmark = async ({
  title,
  roadaddress,
  introduction,
  image,
  phoneno,
}) => {
  const id = uuidv4();
  const newLandmark = await Tour.create({
    id,
    krTitle: title,
    address: roadaddress,
    description: introduction,
    image,
    phoneNo: phoneno,
  });
  return newLandmark;
};

getLandmark.post("/landmark", async (req, res, next) => {
  const { cid } = req.body;
  const response = await axios.get(
    `https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=ggxyk5zq6syr4q5n&locale=kr&cid=${cid}`,
  );
  let { title, roadaddress, introduction, phoneno, latitude, longitude } =
    response.data.items[0];
  if (phoneno.length < 6) {
    phoneno = "-";
  }
  latitude = Number(latitude.toFixed(2));
  longitude = Number(longitude.toFixed(2));
  let image = response.data.items[0].repPhoto.photoid.thumbnailpath;

  const newLandmark = await addLandmark({
    title,
    roadaddress,
    introduction,
    image,
    phoneNo: phoneno,
    latitude,
    longitude,
  });

  res.status(201).json(newLandmark);
});

export { getLandmark };
