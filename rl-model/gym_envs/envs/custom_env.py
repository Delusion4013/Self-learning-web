
import gym
from gym import spaces
import numpy
from math import comb
#Here I import information from RL adapter
from gym_envs.envs.webApp import WebApp


class CustomEnv(gym.Env):
    
    def __init__(self):
        #Initialise webApp
        self.webApp = WebApp()
        #number of spaces in grid
        gridSize = WebApp().getGridSize()
        #number of elements in grid
        elementNum = WebApp().getElementCount()
        #This is a equation to calculate the number of unique pairs
        #This can be done using math.comb(elementNum,2) however we know it a pair it can be so can be simplified 
        combNumberOfPairs = (elementNum*(elementNum-1))/2
        self.action_space = spaces.Discrete(combNumberOfPairs);
        #Fixed type error but not sure what value 100 means
        self.observation_space=spaces.Box(numpy.array([0, 0]), numpy.array([100, 100]), dtype=numpy.int)
        #Representation of website would go here
        #Discuss with group how we shall represent it
    
    def reset(self):
        # Delete the current web application instance and create a new one
        del self.webApp
        self.webApp = WebApp()
        #Establish with team what to do on "reset"
        observation = self.webApp.observe()
        return observation

    def step(self, action):
        self.webApp.action(action)
        observation = self.webApp.observe()
        reward = self.webApp.evaluate()
        done = self.webApp(), self.webApp().is_done()
        return observation, reward, done, {}

    def render(self):
        elements = WebApp.observer(self)
        for row in elements:
            for column in row:
                print(column, end="|")
            print(end="\n")
        return None
    