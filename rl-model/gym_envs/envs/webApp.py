import json

class WebApp:
    data = None
    #Initlise rl adapter
    #Loads json
    def __init__(self):
        with open("data.json", 'r') as f:
            # The data should contain user interaction & website layout
            data = json.load(f)
            sid = data.sessionID
            timeLoggedOn = data.timeLoggedOn
            timeLoggedOff = data.timeLoggedOff
            button_list = []
            time_list = []
            dict_buttons = selectInfo[1] #Define by the Activity collector
            value = dict_cond['buttons']
            for item in value:
                for k, v in item.items():
                    button_list.append(k)
                    time_list.append(v)
            button_dict = dict(zip(button_list,value_list))
        return
    #Makes changes to website based of Qtable value
    def action(self):
        # based on the queue table, update the current website layout
        # and transfer the data back to adapter
        for i in action_space:
            if i==action:
                pass
            #change layout accordingly.(how to realize?)
        return 
        #because there is no stop point for current model, so there is no need to update or check if it fails
    #Evaluate calulates reward and in the prototype 
    #Talks to activity collector
    def evaluate(self):
        # Evaluate the current layout against user interaction and update queue table
        reward = weight_mouseclick * (max_mouseclick-average_mouseclick) + weight_hovertime * (max_hover_time-average_hovertime)
        return reward
    #Redundant as only one action needs to be made to be done
    #Our model is optimisation based not complition based
    #Implement so it is done after one action or is never done
    def is_done(self):
        return False
    #Returns as numbers in a 2d array 
    def observer(self):
        width , height =(getWidth(),getHeight())
        elements=[[0]*width]*height
        id = 0
        for i in data['elements']:
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
        for element in data['elements']:
            elementNum = elementNum + 1
        return elementNum

    def getGridSize(self):
        width , height =(data['gridParams']['w'],data['gridParams']['h'])
        gridSize = width * height
        return gridSize

    def getWidth(self):
        width = data['gridParams']['w']
        return width

    def getHeight(self):
        height = data['gridParams']['h']
        return height