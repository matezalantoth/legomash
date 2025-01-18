import json

from pydantic import BaseModel


class LegoSet:
    def __init__(self, model_number: int, set_name: str, img_link: str, link: str, elo: int = 1400):
        self.model_number = model_number
        self.set_name = set_name
        self.img_link = img_link
        self.link = link
        self.elo = elo

    def to_json(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__)

    def to_dict(self):
        return {
            "model_number": self.model_number,
            "set_name": self.set_name,
            "img_link": self.img_link,
            "link": self.link,
            "elo": self.elo
        }

    model_number: int
    set_name: str
    img_link: str
    link: str
    elo: float

class LegoSetDTO(BaseModel):

    def to_dict(self):
        return {
            "model_number": self.model_number,
            "elo": self.elo
        }

    model_number: int
    elo: float


class AdjustEloDTO(BaseModel):
    winner: LegoSetDTO
    loser: LegoSetDTO