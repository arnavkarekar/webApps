
# A very simple Flask Hello World app for you to get started with...
from flask import *
from collections import Counter

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

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

