import mysql.connector
from mysql.connector import IntegrityError

from schemas import LegoSet, LegoSetDTO

db = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "admin123",
    database = "legomash"
)

cursor = db.cursor()

add_lego_set = ("INSERT INTO lego_sets "
                              "(model_number, set_name, img_link, link, elo) "
                              "VALUES (%(model_number)s, %(set_name)s, %(img_link)s, %(link)s, %(elo)s)")

def init():
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS lego_sets ("
        "model_number INTEGER NOT NULL PRIMARY KEY, "
        "set_name VARCHAR(255), "
        "img_link VARCHAR(255), "
        "link VARCHAR(255), "
        "elo DOUBLE)"
    )

def save(lego_sets: [LegoSet]):
    for lego_set in lego_sets:
        try:
            cursor.execute(add_lego_set, lego_set.to_dict())
        except IntegrityError:
            print("already in the db")
    db.commit()

def get_all() -> [LegoSet]:
    cursor.execute("SELECT * FROM lego_sets")
    sets: [LegoSet] = []
    for lego_set in cursor.fetchall():
        sets.append(LegoSet(lego_set[0], lego_set[1], lego_set[2], lego_set[3], lego_set[4]))
    return sets

def update_elos(lego_sets: [LegoSetDTO]) -> None:
    update_elo = "UPDATE lego_sets SET elo = %(elo)s WHERE model_number = %(model_number)s"
    for lego_set in lego_sets:
        cursor.execute(update_elo, lego_set.to_dict())
    db.commit()


