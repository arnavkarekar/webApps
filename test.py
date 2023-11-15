# A very simple Flask Hello World app for you to get started with...
from flask import *
from collections import Counter
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import *
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase Admin
question1 = {
    'votesA': 0,
    'votesB': 0
}

cred = credentials.Certificate('creds.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
ref = db.collection("questions").document("5")


ref.set(question1)
# doc = ref.get().to_dict()['votesA']
# print(doc)
