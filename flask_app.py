# A very simple Flask Hello World app for you to get started with...
from flask import *
from collections import Counter
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
app.secret_key = 'secret_key'

questions = {
    "q1":['Know the exact date of your death', 'Know how you will die without knowing when'],
    "q2":['Be incredibly wealthy but hated by everyone', 'Be poor but deeply loved and respected by all who know you?'],
    "q3":['Have the power to change the past', 'Have the power to see into the future'],
    "q4":['Have the ability to fly but only at walking speed', 'Have super speed but only while crawling'],
    "q5":['Have the ability to heal any physical ailment instantly', 'Have the power to erase any bad memory from your mind']
}

# Initialize Firebase Admin
cred = credentials.Certificate('creds.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
ref = db.collection("questions").document("1")

@app.route('/survey/', defaults={'question': 1})
@app.route('/survey/<question>')
def survey(question):
    if request.cookies.get('vote_id'):
        return redirect('/results')
    return render_template("survey/index.html")

# @app.route('/vote')
# def vote():
#     answer = request.args["answer"]
#     doc = ref.get().to_dict()
#     doc[f'votes{answer}'] += 1
#     ref.update(doc)
#     return redirect('/results')

@app.route('/vote')
def vote():
    if request.cookies.get('vote_id'):
        return redirect('/results')
    answer = request.args["answer"]
    if answer:
        doc = ref.get().to_dict()
        doc[f'votes{answer}'] += 1
        ref.update(doc)
        resp = make_response(redirect('/results'))
        resp.set_cookie('vote_id', answer)
        return resp
    return redirect('/survey')

@app.route('/results')
def results():
    return render_template("survey/results.html", numA = ref.get().to_dict()['votesA'], numB = ref.get().to_dict()['votesB'])

@app.route('/')
def home():
    return send_from_directory(app.static_folder, path="index.html")

# biosite
@app.route('/biosite')
def test():
    return send_from_directory(app.static_folder, path="biosite/index.html")

@app.route('/schedule')
def schedule():
    return send_from_directory(app.static_folder, path="biosite/schedule.html")

@app.route('/links')
def links():
    return send_from_directory(app.static_folder, path="biosite/links.html")

# CringeSS
@app.route('/cringess')
def coolss():
    return send_from_directory(app.static_folder, path="cringess/index.html")


# CoolSS
@app.route('/coolss')
def cringe():
    return send_from_directory(app.static_folder, path="coolss/index.html")

# Pop Quiz
@app.route('/quiz')
def quiz():
    if request.method == "GET" and "quiz" in request.args:
        num=int(request.args["quiz"])
        if num==6:
            session["setting"]=request.args["setting"]
            counter = Counter(session.values())
            common_val_tuple = counter.most_common(1)[0]
            common_val = common_val_tuple[0]
            entity="Not a Cosmic Being"
            if common_val == "a":
                entity = "a Black Hole"
            elif common_val == "b":
                entity = "a Nebula"
            elif common_val == "c":
                entity = "a White Dwarf"
            elif common_val == "d":
                entity = "an Interdimensional Being"
            return render_template('quiz/final.html', entity=entity, name=session["name"])
        elif num==1:
            session["name"]=request.args["name"]
        elif num==2:
            session["drink"]=request.args["drink"]
        elif num==3:
            session["egg"]=request.args["egg"]
        elif num==4:
            session["carb"]=request.args["carb"]
        elif num==5:
            session["fruit"]=request.args["fruit"]
        return render_template(f"quiz/quiz{num}.html")
    return render_template("/quiz/name.html")

@app.route('/game')
def game():
    return send_from_directory(app.static_folder, path="game/index.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)