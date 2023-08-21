from pymongo import MongoClient
import time

url = "mongodb+srv://woiot:woiot@cluster0.2agswts.mongodb.net/?retryWrites=true&w=majority"
mongo_uri = url
database_name1 = "Asifstocks"
database_name2 = "Asif100daystocks"
collection_name = "stocks"

with MongoClient(mongo_uri) as client:
    db1 = client[database_name1]
    db2 = client[database_name2]
    collection1 = db1[collection_name]
    collection2 = db2[collection_name]

    for _ in range(10000):
        document_list1 = list(collection1.find())
        document_list2 = list(collection2.find())

        for document_live, document_old in zip(document_list1, document_list2):
            filter_query = {'stockSymbol': document_live['stockSymbol']}
            update_query = {'$set': {'stockPrice': document_live['stockPrice']}}
            collection2.update_one(filter_query, update_query)

        print("Success updating from one database to another")

        time.sleep(60)
