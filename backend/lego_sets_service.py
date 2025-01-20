from schemas import AdjustEloDTO, LegoSetDTO


def get_new_elos(req: AdjustEloDTO) -> [LegoSetDTO]:
    winner: LegoSetDTO = req.winner
    loser: LegoSetDTO = req.loser
    winner_new_rating = get_new_rating(winner.elo, 1, calc_expected_score(winner.elo, loser.elo))
    loser_new_rating = get_new_rating(loser.elo, 0, calc_expected_score(loser.elo, winner.elo))

    winner_dto = LegoSetDTO(elo=winner_new_rating, model_number=winner.model_number)
    loser_dto = LegoSetDTO(elo=loser_new_rating, model_number=loser.model_number)
    return [winner_dto, loser_dto]

def calc_expected_score(rating_a: float, rating_b: float) -> float:
    return 1 / (1 + pow(10, (rating_b - rating_a) / 400))

def get_new_rating(rating: float, actual_score: int, expected_score: float) -> float:

    k = 20
    return rating + k * (actual_score - expected_score)