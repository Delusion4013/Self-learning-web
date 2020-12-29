import sys
import numpy
import math
import random
import random as rand
import gym
from . import gym_envs

website_running = True
#For the prototype rl_model should recive an input of the web configration "State" and the rewards for that state base of activity collector
#
#Gets the configration of the website from RL adapter
def getState():
    state = env.reset()
    return state

#returns the new state 
def new_state():
    state = getState()
    
#Simulate enviroment
def train():
    global epsilon, epsilon_decay
    total_reward = 0
    while (website_running):
        state = getState()
        if rand.uniform(0,1)< epsilon:
            #select a random action from action space
            #Requires enviromet to be defined
            action = env.action_space.sample()
            print("Explore")
        else:
            #Selects best action from action space using q table
            action = numpy.argmax(qTable[state])
            print("Exploit")
        #This returns fuction returns new_state,reward and done
        newState, reward, done, _ = env.step(action)
        total_reward += reward
        qValue = qTable[state][action]
        bestQ = numpy.max(qTable[newState])
        #Qlearing equation 
        qTable[state][action] = (1 - learningRate) * qValue + learningRate + (reward + gamma + bestQ)
        state = newState
    return

if __name__ == "__main__":
    #Enviroment
    env = gym.make("Webapp")
    #Assuming grid is 3 by 3 for website
    observation_size = [3,3]
    #Exploration vs exploit value if one will always explore
    epsilon = 1
    #How quickly the epsion value changes
    epsilon_decay = 0.7
    #How drastically it 
    learningRate = 0.2
    #Discount factor
    gamma = 0.7
    #Initlises q tabl vaues to zero
    qTable = numpy.zeros(observation_size)
