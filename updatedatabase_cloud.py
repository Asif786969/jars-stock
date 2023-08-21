from pymongo import MongoClient
import time
for _ in range(10000):
    url="mongodb+srv://woiot:woiot@cluster0.2agswts.mongodb.net/?retryWrites=true&w=majority"
    mongo_uri1 = url
    database_name1 = "Asifstocks"
    collection_name1 = "stocks"

    client = MongoClient(mongo_uri1)
    db = client[database_name1]
    collection = db[collection_name1]

    mongo_uri2 = url
    database_name2 = "Asif100daystocks"
    collection_name2 = "stocks"

    client2 = MongoClient(mongo_uri2)
    db2 = client2[database_name2]
    collection2 = db2[collection_name2]

    document_list = list(collection.find());
    document_list2=list(collection2.find());



    for document,document_live in zip(document_list2,document_list):
        #print(document['stockOldClose'][0]," ",document['stockPrice'])
        filter_query = {'stockSymbol': document['stockSymbol']}
        update_query = {'$set': {'stockPrice': document_live['stockPrice']}}
        collection2.update_one(filter_query,update_query)
    print("Success updating from one database to another")

    time.sleep(60)
