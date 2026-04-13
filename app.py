from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = "hapvida-flask-hap"


@app.route("/")
def index():
    return render_template(
        "dashboard.html",
        page_title="Dashboard",
        page_subtitle="Visao geral de indicadores assistenciais e operacionais.",
    )


if __name__ == "__main__":
    app.run(debug=True)
