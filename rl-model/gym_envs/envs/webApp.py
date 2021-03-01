import json
import numpy
from pathlib import Path
import math
from math import comb
from itertools import permutations
from itertools import combinations
class WebApp:
    web = None
    interactionData = None
    layout_file = None
    interaction_file = None
    gridPath = Path(__file__).parent / "../../../react-website/self-learning-app/src/grid-layouts/test.json"
    activityPath = Path(__file__).parent /"../../../react-website/self-learning-app/src/output-stream/dataOut.json"
    states = []
    #Initlise rl adapter
    #Loads json
    def __init__(self):
        """
        initialize webApp
        """
        self.initWeb()
        self.initInteraction()
        self.initStates()
        return

    def initWeb(self):
        """
        open the json file
        """
        # The data should contain user interaction & website layout
        with self.gridPath.open() as layout_file:
            self.web = json.load(layout_file)
        return

    def initInteraction(self):
        """
        initialize the interaction
        """
        with self.activityPath.open() as interaction_file:
            self.interactionData = json.load(interaction_file)
        return

    def initStates(self):
        """
        initialize the states
        """
        initialState = []
        for element in self.web['elements']:
            initialState.append(element)
        self.states = [state for state in permutations(initialState, len(initialState))]
        return

    #Makes changes to website based of Qtable value
    def action(self, action):
        # based on the queue table, update the current website layout
        # and transfer the data back to adapter
        #because there is no stop point for current model, so there is no need to update or check if it fails
        #Creates list of IDs
        """
        takes an action and do it
        
        Parameters:
        argument1(action): an integer that stands for a certain action
        """
        elementID=math.floor(action/(self.getGridSize()-1))  #50
        destination=action%self.getGridSize()+1
        temp=elementID
        print(elementID)
        print(destination)
        for i in self.web['elements']:
            if temp==0:
                location=(i['rect']['y']-1)*self.getWidth()+i['rect']['x']
                break
            else:
                temp=temp-1
                continue

        if destination<location:
            pass
        else:
            destination=destination+1

        id=1
        for i in self.web['elements']:
            if (i['rect']['x']-1)*self.getWidth()+i['rect']['y']==destination:
                self.swapElement(elementID+1,id)
                return
            else:
                continue
        x=destination%self.getWidth()
        y=destination/self.getWidth()+1
        element=self.getElement(elementID+1)
        element['rect']['x']=x
        element['rect']['y']=y
        self.writeBack()
        return

    def getPair(self,action):
        """
        takes an integer and converts it to a pais

        Parameters:
        argument1(action): an integer that stands for a certain action

        Returns:
        an array containting the two elements' id that action will take place
        """
        listOfIDs = numpy.arange(1,self.getElementCount()+1)
        pairs = [pair for pair in combinations(listOfIDs, 2)]
        return pairs[action]

    #Evaluate calulates reward and in the prototype 
    #Talks to activity collector
    def evaluate(self):
        """
        calculate reward after one action

        Returns:
        float:reward
        """
        # Evaluate the current layout against user interaction and update queue table
        # reward = weight_mouseclick * (max_mouseclick-average_mouseclick) + weight_hovertime * (max_hover_time-average_hovertime)
        # print(self.interactionData['startTime'])
        timeSpent = self.getDiffTime()
        c = 1
        reward = 1 / timeSpent
        return reward
    #Redundant as only one action needs to be made to be done
    #Our model is optimisation based not complition based
    #Implement so it is done after one action or is never done
    def is_done(self):
        """
        Finish up the model with some file closing operations.
        """
        self.layout_file.close()
        self.interaction_file.close()
        return False
    #Returns as numbers in a 2d array 
    def observer(self):
        """
        return the layout of current webpage as 2D array

        Returns:
        List<>: 2D array that stands for the layout
        """
        width , height =(self.getWidth(),self.getHeight())
        elements=numpy.zeros((width,height), dtype=int).astype(str)
        id = 0
        for i in self.web['elements']:
            id = id +1
            #print("ID:", i['id']) 
            #print("x:", i['rect']['x'])
            #print("y:", i['rect']['y'])
            xindex = i['rect']['x']-1
            yindex = i['rect']['y']-1
            #elements[yindex][xindex] = i['id']
            elements[yindex][xindex] = id
        return elements

    def getCurrentState(self):
        """
        Returns:
        An array representing the current elements arrangement.
        """
        currentState = []
        for element in self.web['elements']:
            currentState.append(element)
        return currentState

    def getStateID(self,currentState):
        """
        Returns:
        An integer of the current state's index
        """
        stateID = 0
        tupleState = tuple(currentState)
        for stateID in range(len(self.states)):
            if tupleState == self.states[stateID]:
                return stateID
            stateID += 1

    def observe(self):
        """
        call function self.getStateID(self.getCurrentState())

        Returns:
        An integer of current state's index
        """
        # hovertime=self.getDiffTime
        # mouseclick=self.getElementCount
        return self.getStateID(self.getCurrentState())

    def getElementCount(self):
        """
        get the number of elements in current webpage

        Returns:
        int: the number of elements
        """
        elementNum = 0
        for element in self.web['elements']:
            elementNum = elementNum + 1
        return elementNum

    def getElementID(self,intID):
        """
        get the ID of elements

        Returns:
        int: the ID of element
        """

        id = 0
        for i in self.web['elements']:
            id = id +1
            if intID == id:
                return i['id']

    def getGridSize(self):
        """
        get the area of webpage grid

        Returns:
        int: the area of webpage grid
        """
        width , height =(self.web['gridParams']['w'],self.web['gridParams']['h'])
        gridSize = width * height
        return gridSize

    def getWidth(self):
        """
        get the width of webpage grid

        Returns:
        int: the width
        """
        width = self.web['gridParams']['w']
        return width

    def getHeight(self):
        """
        get the height of webpage grid

        Returns:
        int: the height
        """
        height = self.web['gridParams']['h']
        return height
        
    def getElement(self, elementID):
        """
        get element of current webpage

        Parameters:
        String: The name of the element

        Returns:
        The element with the given ID
        """
        for element in self.web['elements']:
            if(element['id'] == elementID):
                return element

    # This method is responsible for swapping two elements.
    def swapElement(self, elementID_1, elementID_2):
        """
        swap the position of two given element
        """
        e1 = self.getElement(elementID_1)
        e2 = self.getElement(elementID_2)
        temp_x = e1['rect']['x']
        temp_y = e1['rect']['y']
        e1['rect']['x'] = e2['rect']['x']
        e1['rect']['y'] = e2['rect']['y']
        e2['rect']['x'] = temp_x
        e2['rect']['y'] = temp_y
        self.writeBack()
        return

    def getSessionID(self):
        """
        get the session ID

        Returns:
        int: ID of the session
        """
        session_ID = self.interactionData['sessionId']
        return session_ID

    def getDiffTime(self):
        """
        get the difference between start time and end time

        Returns:
        int: the difference between start time and end time
        """
        timeSpent = int(self.getEndTime() - self.getStartTime())
        return timeSpent
    
    def getStartTime(self):
        """
        get the start time

        Returns:
        int: the start time
        """
        startTime = int(self.interactionData['startTime'])
        # print("start Time:" + str(startTime))
        return startTime

    def getEndTime(self):
        """
        get the end time

        Returns:
        int: the end time
        """
        endTime = int(self.interactionData['endTime'])
        # print("end Time:" + str(endTime))
        return endTime

    def getEventsCount(self):
        """
        Returns:
        int: The number of events during the session
        """
        count = 0
        for events in self.interactionData['events']:
            count = count + 1
        return count

    def getEvents(self):
        """
        Returns:
        List: A list of all events during the session
        """
        events = self.interactionData['events']
        return events

    def writeBack(self):
        """
        write back the layout after swap
        """
        with open(self.gridPath, 'w') as layout_file:
            json.dump(self.web, layout_file, indent=4, separators=(',', ':'))
        return