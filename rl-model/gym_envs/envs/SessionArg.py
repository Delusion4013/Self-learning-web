import json
from math import sqrt
from gym_envs.envs.AWSAdapter import AWSadapter 

class SessionArg:
    #Number of sessions
    def __init__(self,argCount) -> None:
        self.argCount = argCount
        self.adapter = AWSadapter('sessions-dev')
        self.avgTime = 0
        self.avgMouseDistance = 0
        self.avgMouseClicks = 0
        #ItNum =  self.checkItNum()
        if self.checkItNum() % self.argCount  == 0:
            self.aggregateSessions()
        
    def aggregateSessions(self) -> None:
        sessions = self.getSessions()
        totalDiff = 0
        totalMouseDistance = 0
        totalMouseClicks = 0        
        for session in sessions:
            #print(sessions)
            if sessions != []:
                totalDiff =+ self.getTimeDiff(session)
                totalMouseDistance =+ self.getMouseDistance(session)
                totalMouseClicks =+ self.getMouseClicks(session)
        self.avgTime = totalDiff/self.argCount
        self.avgMouseDistance = totalMouseDistance/self.argCount
        self.avgMouseClicks = totalMouseClicks/self.argCount
        return
    def checkItNum(self) -> int:
        """

        """
        #print (self.adapter.getLatestSessions()[0]['sessionId'])
        return int(self.adapter.getLatestSessions()[0]['sessionId'])

    def getSessions(self) -> list:
        i = 1
        j = self.checkItNum() // self.argCount
        sessionList = []
        while i < self.argCount:
            sessionList.append(self.adapter.getSessionID(j+i))
            i+=1
        return sessionList

    def getTimeDiff(self,session) -> float:
        #print(session)
        startTime = session[0]['startTime']
        endTime = session[0]['endTime']
        return endTime - startTime

    def getMouseDistance(self,session) -> float:
        totalDistance = 0
        if len(session[0]['mouseEvents']) != 0:
            for i in range(len(session[0]['mouseEvents'])):
                if i != len(session[0]['mouseEvents'])-1:
                   x1 = session[0]['mouseEvents'][i]['m']['x']
                   x2 = session[0]['mouseEvents'][i+1]['m']['x']
                   y1 = session[0]['mouseEvents'][i]['m']['y']
                   y2 = session[0]['mouseEvents'][i+1]['m']['y']
                   totalDistance += sqrt((x2-x1)**2 + (y2-y1)**2)
        #print (totalDistance)
        return totalDistance

    def getMouseClicks(self,session) -> int:
        return len(session[0]['events'])

    def getAvgTime(self) -> float :
        if self.checkItNum() % self.argCount  == 0:
            self.aggregateSessions()
            return self.avgTime
        else:
            return -1
    def getAvgMouseDistance(self)-> float :
        if self.checkItNum() % self.argCount  == 0:
            self.aggregateSessions()
            return self.avgMouseDistance
        else:
            return -1
        
    def getAvgMouseClicks(self)-> float :
        if self.checkItNum() % self.argCount  == 0:
            self.aggregateSessions()
            return self.avgMouseClicks
        else:
            return -1

if __name__ == "__main__":
    adapter = AWSadapter('sessions-dev')
    sa = SessionArg(len(adapter.getallSessions()))

    print(sa.checkItNum())
    print ("Time: ",sa.getAvgTime())
    print ("Mouse Distance: ",sa.getAvgMouseDistance())
    print ("Mouse Clicks: ",sa.getAvgMouseClicks())
    

