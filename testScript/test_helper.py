
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
import random

PATH = "C:\Program Files (x86)\chromedriver.exe"
driver = webdriver.Chrome(PATH)

grp1 =[105,70]

def doRand(i):
  return random.randint(1, i)

def test_helper():
  driver.get("https://dev.do47kanmf5eqe.amplifyapp.com/")
  driver.fullscreen_window()
  driver.implicitly_wait(5)
  
  signIn = driver.find_element_by_id("sign-in")
  hlp = driver.find_element_by_id("help")
  signOut = driver.find_element_by_id("sign-out")
 
  actions = ActionChains(driver)
  actions.pause(random.uniform(4, 5))
  # actions.move_to_element_with_offset(signIn, doRand(grp1[0]), doRand(grp1[0]))

  actions.click(actions.move_to_element_with_offset(signIn, 10,10))
  actions.pause(random.uniform(0.5, 3))
  actions.move_to_element(hlp)
  actions.click()
  actions.pause(random.uniform(0.5, 3))
  actions.move_to_element(signOut)
  actions.click()
  actions.pause(3)
  actions.perform()

  driver.quit()

test_helper()