from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import json

import json_creator
import lego_sets_repository
import lego_sets_service
import scraper
from schemas import LegoSet, AdjustEloDTO

app = FastAPI()

origins = [
    "https://codeconverse.net",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/init_db")
async def init_db() -> None:
    lego_sets_repository.init()

@app.post("/run-scraper")
async def scrape() -> None:
    content = await scraper.scrape()
    lego_sets_repository.save(content)

@app.patch("/adjust-elo")
async def adjust_elo(req: AdjustEloDTO):
    new_values = lego_sets_service.get_new_elos(req)
    lego_sets_repository.update_elos(new_values)

@app.get("/lego-sets")
async def get_lego_sets() -> JSONResponse:
    content: [LegoSet] = lego_sets_repository.get_all()
    json_string: str = json_creator.to_json(content)
    return JSONResponse(content=json.loads(json_string))