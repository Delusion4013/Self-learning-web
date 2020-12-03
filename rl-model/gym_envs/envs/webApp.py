import json

class WebApp:
    #Initlise rl adapter
    #Loads json
    def __init__(self):
        with open("data.json", 'r') as f:
            # The data should contain user interaction & website layout
            data = json.load(f)
        return
    #Makes changes to website based of Qtable value
    def action(self):
        # based on the queue table, update the current website layout
        # and transfer the data back to adapter
        return
    #Evaluate calulates reward and in the prototype 
    #Talks to activity collector
    def evaluate(self):
        # Evaluate the current layout against user interaction and update queue table
        return
    #Redundant as only one action needs to be made to be done
    #Our model is optimisation based not complition based
    #Implement so it is done after one action or is never done
    def is_done(self):
        return False
    #Returns the web config in a readable was 
    def observer(self):
        return
    