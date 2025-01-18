
from schemas import LegoSet


def to_json(lego_sets: [LegoSet]) -> str:
    json: str = "["
    for i, lego_set in enumerate(lego_sets):
        json += lego_set.to_json()
        if i < len(lego_sets) -1:
            json += ','
    return json + "]"