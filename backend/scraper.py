from dotenv import load_dotenv
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import os

from schemas import LegoSet


async def scrape() -> [LegoSet]:
    load_dotenv()
    chrome_service = webdriver.ChromeService(executable_path=os.getenv("CHROMEDRIVER_PATH"))
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.getenv("CHROME_BINARY_PATH")
    driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    url: str = "https://lego.com"
    sets: [LegoSet] = []
    driver.get(url)
    driver.fullscreen_window()
    adult_check = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, 'age-gate-grown-up-cta')))
    adult_check.click()
    cookies = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[5]/div/aside/div/div/div[3]/div[1]/button[1]")))
    cookies.click()
    shop = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "blt51f52bea34c3fb01_menubutton")))
    shop.click()
    sets_by_theme =  WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div[2]/header/div[4]/div[2]/div/div[2]/nav/div/div[1]/ul/li[1]/button/div/span")))
    sets_by_theme.click()
    themes = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div[2]/header/div[4]/div[2]/div/div[2]/nav/div/div[1]/div/div[1]/div")))
    print("theme accessed")
    theme_names = []
    theme_children = themes.find_elements(By.XPATH, ".//div")
    for first_child in theme_children:
        second_children = first_child.find_elements(By.XPATH, ".//div")
        for second_child in second_children:
            third_child = second_child.find_element(By.TAG_NAME, "A")
            final_child = third_child.find_element(By.TAG_NAME, "SPAN")
            try:
                final_child_i = final_child.find_element(By.TAG_NAME, "I")
                theme_names.append(final_child_i.text)
            except NoSuchElementException:
                theme_names.append(final_child.text)


    print(theme_names)
    star_wars_button =  WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div[2]/header/div[4]/div[2]/div/div[2]/nav/div/div[1]/div/div[1]/div/div[3]/div[10]/a")))
    star_wars_button.click()
    star_wars_sets = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/main/div/div[4]/div/section/div/div[2]/div/ul")))
    for star_wars_set in star_wars_sets.find_elements(By.XPATH, ".//li"):
        try:
            set_article = star_wars_set.find_element(By.TAG_NAME, "ARTICLE")
            set_item = set_article.find_element(By.TAG_NAME, "A")
            set_item_ul = set_item.find_element(By.TAG_NAME, "UL")
            set_item_ul_li = set_item_ul.find_element(By.TAG_NAME, "LI")
            set_item_image = set_item_ul_li.find_element(By.TAG_NAME, "PICTURE").find_element(By.TAG_NAME, "source")
            set_name_element = set_article.find_element(By.TAG_NAME, "H3").find_element(By.TAG_NAME, "A")
            set_name_element.find_element(By.TAG_NAME, "SPAN")
            link = set_name_element.get_attribute("href")
            model_number = link[len(link) - 5:]
            set_name = set_name_element.find_element(By.TAG_NAME, "SPAN").text
            img_link = [item[:len(item) -3] for item in set_item_image.get_attribute("srcset").split(', ')][2]
            sets.append(LegoSet(model_number, set_name, img_link, link))
        except NoSuchElementException:
            print("not found")
    return sets