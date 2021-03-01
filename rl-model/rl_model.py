import sys
import numpy
import math
import random
import random as rand
import gym
import gym_envs
from random import choice
website_running = True

class Rlmodel:
    qTable = None
    env = None
    #Exploration vs exploit value if one will always explore
    epsilon = 1
    #How quickly the epsilon value changes
    epsilon_decay = 0.7
    #How drastically it updates the q value
    learningRate = 0.2
    #Discount factor
    gamma = 0.7
    #Value that tells us if the rl model exploites or explores
    exploreExploit = 0
    #Value that
    randValue = -1
    render = False
    website_running = None
    def __init__(self):
        self.env = gym.make("Webapp-v0")
        self.createQtable()

    def setEpsilon(self,ep):
        self.epsilon = ep
        return
    def setEpsilonDecay(self,decay):
        self.epsilon_decay= decay
        return
    def setLearningRate(self,lr):
        self.learningRate= lr
        return
    def setGamma(self,gamma):
        self.gamma = gamma
        return
    def setWebRunning(self,state):
        self.website_running = state
        return
    def setRender(self,state):
        self.render = state
        return
    def createQtable(self):
        #Number of observation values
        obs_size = [int(self.env.observation_space.high)] * len(self.env.observation_space.high)
        #Number of observation types (for prototype is only mouse click and time spent of the website)
        #print(env.observation_space.high)
        #print(env.observation_space.low)
        #print(obs_size)
        #Initialise q table values to zero
        action_size=[len(self.env.action_space)]
        self.qTable = numpy.zeros(obs_size + action_size)
        return
    
    #For the prototype rl_model should receive an input of the web configration "State" and the rewards for that state base of activity collector
    #
    #Gets the configration of the website from RL adapter
    def getState(self):
        state = self.env.reset()
        return state

    #returns the new state 
    def new_state(self):
        state = self.getState()
        return state
        
    #Simulate environment and trains rl model
    def train(self):
        self.website_running = True
        i=0
        state = self.getState()
        while (self.website_running and i <= 100):
            self.randValue = rand.uniform(0,1)
            i += 1
            if self.randValue < self.epsilon:
                #select a random action from action space
                #Requires environment to be defined
                action = choice(self.env.action_space)
                exploreExploit = 1
                #print("Explore")
            else:
                #Selects best action from action space using q table
                action = numpy.argmax(self.qTable[state])
                exploreExploit = 2
                #print("Exploit")
            # #This returns function returns new_state,reward and done
            newState, reward, website_running, _ = self.env.step(action)
            qValue = self.qTable[state][action]
            bestQ = numpy.max(self.qTable[newState])
            #Qlearing equation 
            self.qTable[state][action] = (1 - self.learningRate) * qValue + self.learningRate + (reward + self.gamma + bestQ)
            state = newState
            if self.render == True:
                self.env.render()
            #Decays epsilon
            if(self.epsilon > 0.2):
                self.epsilon *= self.epsilon_decay
            #print(self.epsilon)
        self.env.close()
        return

    def getEpsilon(self):
        return self.epsilon

    def getExploreExpliotValue(self):
        return self.exploreExploit

    def getRandValue(self):
        return self.randValue

    def getQtable(self):
        return self.qTable

if __name__ == "__main__":
    rlModel = Rlmodel()

    rlModel.setEpsilon(1)
    rlModel.setEpsilonDecay(0.7)
    rlModel.setLearningRate(0.2)
    rlModel.setGamma(0.7)
    rlModel.setRender(True)
    rlModel.train()

    #rlmodel.setWebRunning(False)
    
