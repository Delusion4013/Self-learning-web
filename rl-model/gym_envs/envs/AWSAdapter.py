import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
import decimal
import datetime
from pprint import pprint

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


class AWSadapter() :
    count = 0
    response = None
    tableName = None
    table = None
    def __init__(self,tableName):
        # Get the service resource.
        dynamodb = boto3.resource('dynamodb')
        # Instantiate a table resource object without actually
        # creating a DynamoDB table. Note that the attributes of this table
        # are lazy-loaded: a request is not made nor are the attribute
        # values populated until the attributes
        # on the table resource are accessed or its load() method is called.
        self.table = dynamodb.Table(tableName)
        self.tableName = tableName
        self.count = self.table.item_count
    
    def getLatestLayout(self):
        """
        Based on the current item count in the layout table, returns the layout with
        last id.

        Returns: A string contatining the inforamtion about latest layout.
        """
        self.response = self.table.query(
            KeyConditionExpression=Key('layoutId').eq(self.count),
            ProjectionExpression = "layoutId, createdAt, gridParams, elements",
        )
        # print(self.response)
        return json.dumps(self.response['Items'][0], cls=DecimalEncoder)

    def getLayoutAtId(self, id):
        """
        Based on the id number given, returns the layout with given id.

        Returns: A string contatining the inforamtion about latest layout.
        """
        self.response = self.table.query(
            KeyConditionExpression=Key('layoutId').eq(id),
            ProjectionExpression = "layoutId, createdAt, gridParams, elements",
        )
        return json.dumps(self.response['Items'][0], cls=DecimalEncoder)

    def updateLayout(self,layoutId, layout):
        """
        Based on the layoutId given, update the layout at that id with the 
        new layout provided.
        """
        item = self.getLayoutAtId(layoutId)
        jitem = json.loads(item)
        id = jitem['layoutId']
        creation_time = jitem['createdAt']
        self.table.update_item(
            Key = {
                'layoutId' : id,
                'createdAt': creation_time
            },
            UpdateExpression = 'SET gridParams = :val1, elements = :val2',
            ExpressionAttributeValues = {
                ':val1' : layout['gridParams'],
                ':val2' : layout['elements']
            }
        )
        # test = self.getLayoutAtId(1)
        # print(test)

    def addLayout(self, layout):
        """
        Based on the layout given, add a new row in the table.

        Returns: the response from the database.
        """
        newId = str(self.count+1)
        createdAt =  datetime.datetime.now().isoformat()
        response = self.table.put_item(
            Item = {
                'layoutId' : newId,
                'createdAt' : createdAt,
                'gridParams' : layout['gridParams'],
                'elements' : layout['elements']
            }
        )
        return response

    def getLatestSessions(self):        
        """
        Retrives on the latest session.
        Returns: 
            Json: Containing latset session.
        """
        self.response = self.table.query(
            KeyConditionExpression=Key('sessionId').eq(self.count),
        )
        return json.loads(json.dumps(self.response['Items'], cls=DecimalEncoder))
    
    def getallSessions(self):
        """
        Retrives all the session in the table.

        Returns: 
            Json: Containing all the session.
        """
        self.response = self.table.scan(
            # ProjectionExpression = 'sessionId, createdAt, startTime, endTime, events,mouseEvents'
        )
        return json.loads(json.dumps(self.response['Items'], cls=DecimalEncoder))

    def getSessionID(self, id):
        """
        
        Retrives Session based on given ID on the latest session.
        Arg:
            Int: Id of session
        Returns: 
            Json: Containing session.
        """
        self.response = self.table.query(
            KeyConditionExpression=Key('sessionId').eq(id),
        )
        return json.loads(json.dumps(self.response['Items'], cls=DecimalEncoder))

if __name__ == "__main__":
    adapter = AWSadapter('layouts-dev')
    # adapter = AWSadapter('sessions-dev')
    print(adapter.getLatestLayout())
    # print(adapter.getallSessions())
    #print(adapter.getSessionID(3))
    # print(adapter.getLatestSessions())
    # jtest = json.loads(test)

    # adapter.updateLayout(AWSadapter.count,jtest)

    # iso_now = datetime.datetime.now().isoformat()
    # print(type(iso_now))
    
    # add_response = adapter.addLayout(jtest)
    # pprint(add_response, sort_dicts=False)

