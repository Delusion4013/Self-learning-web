import sys
import numpy
import math
import random
import random as rand
import gym
import gym_envs

website_running = True
#For the prototype rl_model should receive an input of the web configration "State" and the rewards for that state base of activity collector
#
#Gets the configration of the website from RL adapter
def getState():
    state = env.reset()
    return state

#returns the new state 
def new_state():
    state = getState()
    
#Simulate environment and trains rl model
def train(epsilon,epsilon_decay,learningRate,gamma):
    website_running = True
    state = getState()
    while (website_running):
        if rand.uniform(0,1)< epsilon:
            #select a random action from action space
            #Requires environment to be defined
            action = env.action_space.sample()
            print("Explore")
        else:
            #Selects best action from action space using q table
            action = numpy.argmax(qTable[state])
            print("Exploit")
        # #This returns function returns new_state,reward and done
        newState, reward, website_running, _ = env.step(action)
        qValue = qTable[state][action]
        bestQ = numpy.max(qTable[newState])
        #Qlearing equation 
        qTable[state][action] = (1 - learningRate) * qValue + learningRate + (reward + gamma + bestQ)
        state = newState
        env.render()
        #Decays epsilon
        if(epsilon > 0.2):
            epsilon *= epsilon_decay
        print(epsilon)
    return

if __name__ == "__main__":
    #Environment
    env = gym.make("Webapp-v0")
    #Exploration vs exploit value if one will always explore
    epsilon = 1
    #How quickly the epsilon value changes
    epsilon_decay = 0.7
    #How drastically it updates the q value
    learningRate = 0.2
    #Discount factor
    gamma = 0.7
    #Number of observation types (for prototype is only mouse click and time spent of the website)
    print(env.observation_space.high)
    print(env.observation_space.low)
    #Number of observation values
    obs_size = [int(env.observation_space.high)] * len(env.observation_space.high)
    print(obs_size)
    #Initialise q table values to zero
    action_size=[int(env.action_space.n)]
    qTable = numpy.zeros(obs_size + action_size)
    
    train(epsilon,epsilon_decay,learningRate,gamma)
    env.close()
