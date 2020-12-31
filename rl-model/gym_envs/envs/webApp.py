import json
import numpy
from pathlib import Path
import itertools
class WebApp:
    web = None
    interactionData = None
    layout_file = None
    interaction_file = None
    gridPath = Path(__file__).parent / "../../../react-website/self-learning-app/src/grid-layouts/test.json"
    activityPath = Path(__file__).parent /"../../../react-website/self-learning-app/src/output-stream/dataOut.json"
    #Initlise rl adapter
    #Loads json
    def __init__(self):
        self.initWeb()
        self.initInteraction()
        return

    def initWeb(self):
        # The data should contain user interaction & website layout
        with self.gridPath.open() as layout_file:
            self.web = json.load(layout_file)
        return

    def initInteraction(self):
        with self.activityPath.open() as interaction_file:
            self.interactionData = json.load(interaction_file)
        return

    #Makes changes to website based of Qtable value
    def action(self, action):
        # based on the queue table, update the current website layout
        # and transfer the data back to adapter
        #because there is no stop point for current model, so there is no need to update or check if it fails
        #Creates list of IDs
        element = self.getPair(action)
        firstElement = self.getElementID(element[0])
        secondElement = self.getElementID(element[1])
        self.swapElement(firstElement,secondElement)
        return

    def getPair(self,action):
        listOfIDs = numpy.arange(1,self.getElementCount()+1)
        pairs = [pair for pair in itertools.combinations(listOfIDs, 2)]
        return pairs[action]

    #Evaluate calulates reward and in the prototype 
    #Talks to activity collector
    def evaluate(self):
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
        self.layout_file.close()
        self.interaction_file.close()
        return False
    #Returns as numbers in a 2d array 
    def observer(self):
        width , height =(self.getWidth(),self.getHeight())
        elements=[[0]*width]*height
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
        return  elements

    def observe(self):
        hovertime=self.getDiffTime
        mouseclick=self.getElementCount
        return (hovertime,mouseclick)

    def getElementCount(self):
        elementNum = 0
        for element in self.web['elements']:
            elementNum = elementNum + 1
        return elementNum

    def getElementID(self,intID):
        id = 0
        for i in self.web['elements']:
            id = id +1
            if intID == id:
                    return i['id']

    def getGridSize(self):
        width , height =(self.web['gridParams']['w'],self.web['gridParams']['h'])
        gridSize = width * height
        return gridSize

    def getWidth(self):
        width = self.web['gridParams']['w']
        return width

    def getHeight(self):
        height = self.web['gridParams']['h']
        return height
        
    def getElement(self, elementID):
         for element in self.web['elements']:
            if(element['id'] == elementID):
                return element

    # This method is responsible for swapping two elements.
    def swapElement(self, elementID_1, elementID_2):
        e1 = self.getElement(elementID_1)
        e2 = self.getElement(elementID_2)
        temp_x = e1['rect']['x']
        temp_y = e1['rect']['y']
        e1['rect']['x'] = e2['rect']['x']
        e1['rect']['y'] = e2['rect']['y']
        e2['rect']['x'] = temp_x
        e2['rect']['y'] = temp_y
        return

    def getSessionID(self):
        session_ID = self.interactionData['sessionId']
        return session_ID

    def getDiffTime(self):
        timeSpent = int(self.getEndTime() - self.getStartTime())
        return timeSpent
    
    def getStartTime(self):
        startTime = int(self.interactionData['startTime'])
        print("start Time:" + str(startTime))
        return startTime

    def getEndTime(self):
        endTime = int(self.interactionData['endTime'])
        print("end Time:" + str(endTime))
        return endTime

    def getEventsCount(self):
        count = 0
        for events in self.interactionData['events']:
            count = count + 1
        return count

    def getEvents(self):
        events = self.interactionData['events']
        return events

