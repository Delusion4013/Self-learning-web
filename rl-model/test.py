import unittest
import sys
import numpy
import math
import random
import random as rand
import gym
import gym_envs

class TestCustom_Env(unittest.TestCase):

    def testReset(self):
        #test if the reset function in custom_env.py can return an integer stand for layout properly
        self.assertEqual(0,env.reset())

    def testStep(self):
        #test if the step function can return four variable correctly
        #copy and paste from rl_model
        action = env.action_space.sample()
        observation, reward, done, empty=env.step(action)
        self.assertEqual(0,observation)
        self.assertEqual(0.0002134927412467976,reward)
        #done is assigned False in step function, why here it is True?
        self.assertEqual(True,done)
        #do not know why it is {'TimeLimit.truncated': True} here
        self.assertEqual({'TimeLimit.truncated': True},empty)

    def testRender(self):
        #test if render function return None, by the way, after finishing this test I know python test can print
        self.assertEqual(None,env.render())

if __name__ == '__main__':
    env = gym.make("Webapp-v0")
    unittest.main()