# flask-hap

Skill do Claude Code para criar aplicacoes Flask com a identidade visual da Hapvida NotreDame Intermedica.

## O que faz

Gera apps, dashboards e prototipos em Flask ja estilizados com a paleta, tipografia e componentes institucionais Hapvida. Tema coeso, sem emoji, com CSS estatico via variaveis `--hap-*`, KPIs, graficos Chart.js na paleta da marca e layout pronto para uso interno.

## Instalacao

Clone em `~/.claude/skills/flask-hap` ou sincronize via `/skill-sync`.

```bash
git clone git@github.com:fabianofilho/flask-hap.git ~/.claude/skills/flask-hap
```

## Uso

No Claude Code, digite:

- `/flask-hap`
- "cria um dashboard flask da hapvida"
- "estiliza esse app flask com identidade hpv"
- "refatora esse projeto flask pra ficar com cara da hapvida"

A skill cuida do CSS base, dos componentes (KPI, badge, secao, footer), dos graficos Chart.js na paleta da marca e do checklist de entrega.

## Paleta

| Token | Hex |
|---|---|
| Laranja Hapvida | `#FF7A00` |
| Azul NotreDame | `#003DA5` |
| Azul escuro | `#0B2F7A` |
| Verde sucesso | `#1F9D55` |
| Vermelho alerta | `#D64545` |

Paleta completa e tokens CSS no `SKILL.md`.

## Estrutura do repositorio

```
flask-hap/
    app.py               <- app de exemplo executavel
    requirements.txt
    SKILL.md             <- definicao completa da skill
    static/
        css/
            hap.css      <- CSS com variaveis e componentes Hapvida
        js/
            hap-charts.js  <- utilitarios Chart.js com paleta da marca
    templates/
        base.html        <- template base Jinja2 com sidebar, header e footer
        dashboard.html   <- exemplo de dashboard com KPIs, graficos e tabela
```

## Regras

- Sem emoji em qualquer parte da UI ou codigo.
- Sem travessao, sem aspas tipograficas, sem reticencias Unicode.
- Acentuacao portuguesa correta em todo texto visivel.
- Fonte Inter obrigatoria.
- Graficos Chart.js sempre com `HAP_PALETTE` via `hap-charts.js`.

## Como executar o exemplo

```bash
pip install flask
flask run
```

Acesse `http://localhost:5000`.

## Licenca

Uso interno Hapvida NotreDame Intermedica.
