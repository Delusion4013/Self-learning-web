import json
from pathlib import Path
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
        with self.gridPath.open() as f:
            self.web = json.load(f)
        return

    def initInteraction(self):
        with self.gridPath.open() as f:
            self.interactionData = json.load(f)
        return

    #Makes changes to website based of Qtable value
    def action(self, action):
        # based on the queue table, update the current website layout
        # and transfer the data back to adapter
        firstElement = self.getElementID(action[0])
        secondElement = self.getElementID(action[1])
        self.swapElement(firstElement,secondElement)
        #because there is no stop point for current model, so there is no need to update or check if it fails
    #Evaluate calulates reward and in the prototype 
    #Talks to activity collector
    def evaluate(self):
        # Evaluate the current layout against user interaction and update queue table
        # reward = weight_mouseclick * (max_mouseclick-average_mouseclick) + weight_hovertime * (max_hover_time-average_hovertime)
        timeSpent = self.getDiffTime()
        c = 1
        reward = 1 / timeSpent * c
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
        return self.getEndTime() - self.getStartTime()

    def getStartTime(self):
        startTime = self.interactionData['startTime']
        return startTime

    def getEndTime(self):
        endTime = self.interactionData['endTime']
        return endTime

    def getEventsCount(self):
        count = 0
        for events in self.interactionData['events']:
            count = count + 1
        return count

    def getEvents(self):
        events = self.interactionData['events']
        return events

