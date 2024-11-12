import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors = require("cors")

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


const API_BASE_URL = "https://api.mangadex.org"

const COVER_IMG_URL_BASE = "https://uploads.mangadex.org/covers";

const ITEMS_PER_PAGE_SEARCH = 10
const ITEMS_PER_PAGE_CHAPTERS = 16

app.use(cors<Request>())

app.get("/manga/title/:title", async (req: Request, res: Response) => {
  try {

    let response = await fetch(`${API_BASE_URL}/manga?title=${req.params.title}&includes[]=cover_art&includes[]=author&includes[]=artist&limit=${ITEMS_PER_PAGE_SEARCH}&offset=0`)

    let mangas = await response.json();

    res.status(200).json(mangas)

  } catch (error) {
    console.error(error)

    res.status(500).send("error sending response")
  }
});

app.get("/cover/title/:title", async (req: Request, res: Response) => {

  try {

  } catch (error) {

  }
});

app.get("/manga/id/:id", async (req: Request, res: Response) => {

  try {
    let response = await fetch(`${API_BASE_URL}/manga/${req.params.id}/feed?limit=${ITEMS_PER_PAGE_CHAPTERS}&offset=0&translatedLanguage[]=en&includes[]=scanlation_group&includeExternalUrl=0&contentRating[]=safe&contentRating[]=suggestive`)

    let asJson = await response.json()

    res.status(200).json(asJson)

  } catch (error) {

    console.error(error)

    res.status(500).send("some error ocurred")

  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
