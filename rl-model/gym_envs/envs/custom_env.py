
import gym
from gym import spaces
import numpy
from math import comb
#Here I import information from RL adapter
from gym_envs.envs.webApp import WebApp


class CustomEnv(gym.Env):
    
    def __init__(self):
        #Initilisese webApp
        self.webApp = WebApp()
        #number of spaces in grid
        gridSize = WebApp().getGridSize()
        #number of elements in grid
        elementNum = WebApp().getElementCount()
        #Nubmer of combination of elementis in a grid size
        #combin = comb(gridSize,elementNum)
        #Action space deterimines the number of potential moves that can be made
        #In our case that would be the potential combinations of elements in the grid
        #self.action_space = spaces.Discrete(combin)
    
        actionCount= 0;
        for i in range(1,WebApp().getElementCount()):
            for j in range(1,WebApp().getElementCount()):
                if (i != j):
                    # self.obsertvation_space.append((i,j))
                    actionCount += 1
        self.action_space = spaces.Discrete(actionCount);
        self.observation_space=spaces.Box((0,0),(100,100),dtype=int)
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
        WebApp.action(action)
        observation = WebApp.observe()
        reward = WebApp.evaluate()
        done = self.webApp(), self.webApp().is_done()
        return observation, reward, done, {}

    def render(self):
        elements = WebApp.observer(self)
        for row in elements:
            for column in row:
                print(column, end="|")
            print(end="\n")
        return None
    