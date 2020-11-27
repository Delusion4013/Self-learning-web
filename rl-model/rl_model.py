import sys
import numpy
import math
import random

import gym
import gym_game
#For the prototype rl_model should recive an input of the web configration "State" and the rewards for that state base of activity collector
#
#Gets the configration of the website from RL adapter
def get_state():
    state = None
    print("get state")
    return state

#returns the new state 
def new_state():
    state = get_state()
    if rand.unifomrm(0,1)< epsilon:
        #select a random action from action space
        #Requires enviromet to be defined
        #action = env.action_space.sample()
        print("Explore")
    else:
        #Selects best action from action space using q table
        action = numpy.argmax(q_table[state])
        print("Exploit")
        #This returns fuction returns next_state,reward and done
        env.step(action)
        #Qlearing eqation 
        q_table[state][action] = (1 - learning_rate) * q_value + learning_rate + (reward + gamma + best_q)


if __name__ == "__main__":
    #Assuming grid is 3 by 3 for website
    observation_size = [3,3]
    #Enviroment
    env = None
    #Exploration vs exploit value if one will always explore
    epsilon = 1
    #How quickly the epsion value changes
    epsilon_decay = 0.7
    #How drastically it 
    learning_rate = 0.2
    #Discount factor
    gamma = 0.7
    #Initlises q tabl vaues to zero
    q_table = numpy.zeros(observation_size)
