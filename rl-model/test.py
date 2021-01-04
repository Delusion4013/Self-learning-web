import unittest
import sys
import numpy
import math
import random
import random as rand
import gym
import gym_envs
from rl_model import Rlmodel
from gym_envs.envs.webApp import WebApp
class TestCustom_Env(unittest.TestCase):

    def testInit(self):
        #test if webApp is initialized and if other object is None
        webApp=env.getWebApp()
        self.assertIsNotNone(webApp)
        self.assertLess(0,webApp.getGridSize())
        self.assertLess(0,webApp.getElementCount())
        self.assertIsNotNone(env.getActionSpace())
        self.assertIsNotNone(env.getObservationSpace())

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

class TestRlModel(unittest.TestCase):
    rlmodel = None
    def setUp(self) -> None:
        self.rlmodel = Rlmodel()

        return super().setUp()
    def testEpsilon(self):
        rlmodel = Rlmodel()
        initialEpsilon = rlmodel.getEpsilon()
        rlmodel.train()
        rlmodel.setWebRunning(False)
        epsilon = rlmodel.getEpsilon()
        self.assertLess(epsilon,initialEpsilon)

    def testExploitExplore(self):
        rlmodel = Rlmodel()
        rlmodel.train()
        rlmodel.setWebRunning(False)
        if rlmodel.getExploreExpliotValue() == 1:
            self.assertLess(rlmodel.getRandValue(),rlmodel.getEplsion())
        elif rlmodel.getExploreExpliotValue() == 2:
            self.assertGreater(rlmodel.getRandValue(),rlmodel.getEplsion()) 

    def testQtable(self):
        rlmodel = Rlmodel()
        initalQtable = rlmodel.getQtable()
        rlmodel.train()
        qTable = rlmodel.getQtable()
        notZero = False
        for row in qTable:
            for value in row:
                if value != 0:
                    notZero = True
                    break
        self.assertTrue(notZero)

class TestWebApp(unittest.TestCase):
    webApp = None
    def setUp(self) -> None:
        self.webApp = WebApp()
        return super().setUp()

    def testGetElementCount(self):
        self.assertEqual(4,self.webApp.getElementCount())

    def testGetElementID(self):
        intID = 2
        self.assertEqual(self.webApp.web['elements'][intID], self.webApp.getElementID(intID))

    def testGetGridSize(self):
        self.assertEqual(25, self.webApp.getGridSize())

    def testGetWidth(self):
        self.assertEqual(5,self.webApp.getWidth())

    def testGetHeight(self):
        self.assertEqual(5,self.webApp.getHeight())

    def testGetElement(self):
        elementID = 'signIn'
        self.assertEqual(self.webApp.web['elements'][0], self.webApp.getElement(elementID))

    def testGetSessionID(self):
        self.assertEqual(0, self.webApp.getSessionID())

    def testGetStartTime(self):
        self.assertEqual(1607517809980, self.webApp.getStartTime())

    def testGetEndTime(self):
        self.assertEqual(1607517814664, self.webApp.getEndTime())

    def testGetEventCount(self):
        self.assertEqual(4, self.webApp.getElementCount())

    def testGetEvents(self):
        self.assertEqual(self.webApp.interactionData['events'], self.webApp.getEvents())

if __name__ == '__main__':
    env = gym.make("Webapp-v0")
    unittest.main()