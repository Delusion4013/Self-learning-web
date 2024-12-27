class Qtable:

    def __init__(self) -> None:
        self.qtable = {}


    def getQValue(self,state,action) -> float:
        key = (state,action)
        if key in self.qtable.keys():
            return self.qtable[key]
        else:
            return 0

    def setQValue(self,state,action,value) -> None:
        key = (state,action)
        if value == 0:
            del self.qtable[key]
        else:
            self.qtable[key] = value
        
    def getQtable(self) -> dict:
        return self.qtable

    def getMaxValue(self) -> float:
        maxQvalue = 0
        for key in self.qtable:
            if  self.qtable[key] > maxQvalue:
                maxQvalue = self.qtable[key]
        return maxQvalue

    def getMaxKey(self):
        maxKey = None
        for key in self.qtable:
            if maxKey == None:
                maxKey = key
            elif  self.qtable[key] > self.qtable[maxKey]:
                maxKey = key
        return maxKey

    def getStateMaxValue(self,state) -> float:
        stateMax = 0
        for key in self.qtable:
            if key[0] == state and self.qtable[key] > stateMax:
                stateMax = self.qtable[key]
        return stateMax

    def getStateMaxKey(self,state):
        maxKey = None
        for key in self.qtable:
            if maxKey == None:
                maxKey = key
            elif key[0] == state and self.qtable[key] > self.qtable[maxKey]:
                maxKey =key
        return maxKey

if __name__ == "__main__":
    qtable = Qtable()
    print(qtable.getQValue(1,1))
    qtable.setQValue(1,1,1)
    qtable.setQValue(2,1,2)
    qtable.setQValue(2,2,3)
    qtable.setQValue(2,3,4)
    qtable.setQValue(2,4,5)
    qtable.setQValue(3,4,5)
    print(qtable.getQtable())
    print(qtable.getMaxKey())
    print(qtable.getMaxValue())
    print(qtable.getStateMaxKey(3))
    print(qtable.getQValue(1,1))
    qtable.setQValue(1,1,0)
    print(qtable.getQtable())
