
import gym
from gym import spaces
import numpy
from math import comb
#Here I import information from RL adapter
from gym_envs.envs.webApp import WebApp


class CustomEnv(gym.Env):
    
    def __init__(self):
        #number of spaces in grid
        gridSize = 9
        #number of elements in grid
        elementNum = 9
        self.webApp = WebApp()
        #Action space deterimines the number of potentail moves that can be made
        #In our case that would be the potential combinations in the grid
        #Add function later to calcualte combination but for now as it is a 
        self.action_space = spaces.Discrete(comb(gridSize,elementNum))
        #Representation of website would go here
        #Discuss with group how we shall represent it
        self.obsertvation_space = None
    
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
        done = self.webApp(),is_done()
        return observation, reward, done, {}
    