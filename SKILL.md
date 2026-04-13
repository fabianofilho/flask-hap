---
name: flask-hap
description: Cria aplicacoes Flask com a identidade visual da Hapvida NotreDame Intermedica. Use esta skill sempre que o usuario pedir para construir, estilizar ou refatorar apps, dashboards, paginas, componentes ou prototipos em Flask no contexto Hapvida, ou quando usar os gatilhos "/flask-hap", "app flask hapvida", "dashboard hpv flask", "flask com cara da hapvida".
---

# Skill: flask-hap

Cria aplicacoes Flask profissionais com a identidade visual da Hapvida NotreDame Intermedica. Gera estrutura de projeto completa: `app.py`, templates Jinja2, CSS estatico com variaveis de cor, utilitarios de graficos Chart.js e componentes consistentes entre paginas.

## Quando usar

- Usuario digita `/flask-hap`
- Pedidos como "faz um dashboard flask da hapvida", "cria um app flask com identidade hapvida", "estiliza esse projeto flask pra ficar com cara da hpv"
- Refatoracao visual de qualquer projeto Flask existente para o padrao Hapvida
- Prototipos internos de produtos de IA medica, analytics e gestao para times Hapvida

## Principios de design

Antes de codar, defina uma direcao clara:

- **Proposito**: Quem usa, o que decide, que dado e critico na primeira dobra.
- **Tom**: Institucional, confiavel, clinico-corporativo. Layout limpo, whitespace generoso, hierarquia tipografica clara.
- **Diferenciacao**: Micro-detalhes bem feitos valem mais que efeitos chamativos.
- **Densidade**: Dashboards de gestao podem ter densidade alta. Apps clinicos priorizam menos elementos por tela.

Refinamento acima de espetaculo. Se ficou em duvida, tire elementos.

## Identidade visual Hapvida (obrigatoria)

### Tokens de cor

| Token | Hex | Uso |
|---|---|---|
| Laranja Hapvida | `#FF7A00` | Cor principal, botoes primarios, destaques, KPIs positivos |
| Laranja hover | `#E56A00` | Hover de botoes e links |
| Laranja suave | `#FFF3E6` | Fundos de badges, realces sutis |
| Azul NotreDame | `#003DA5` | Cor secundaria, titulos de secao, links |
| Azul escuro | `#0B2F7A` | Texto de titulos, navegacao ativa |
| Verde sucesso | `#1F9D55` | Indicadores positivos, check, taxa atingida |
| Vermelho alerta | `#D64545` | Alertas, valores criticos, outliers |
| Amarelo atencao | `#F0B429` | Avisos intermediarios |
| Cinza 900 | `#1A1A1A` | Texto principal |
| Cinza 700 | `#4A4A4A` | Texto secundario |
| Cinza 500 | `#7A7A7A` | Labels, metadados |
| Cinza 200 | `#E5E7EB` | Bordas, separadores |
| Cinza 100 | `#F5F6F8` | Fundo de cards, secoes alternadas |
| Branco | `#FFFFFF` | Fundo principal |

Sempre use `var(--hap-*)` do `static/css/hap.css`. Nunca misture com outras paletas.

### Tipografia

Fonte principal: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

Hierarquia:
- H1 (titulo de app): `font-weight:800; font-size:28px; color:#0B2F7A; letter-spacing:-0.01em;`
- H2 (secao): `font-weight:700; font-size:18px; color:#0B2F7A;`
- Body: `font-weight:400; font-size:14px; color:#1A1A1A; line-height:1.55;`
- Label/caption: `font-weight:600; font-size:11px; color:#7A7A7A; letter-spacing:0.6px; text-transform:uppercase;`

### Regras inviolaveis

- Sem emoji em qualquer lugar da UI ou do codigo.
- Sem travessao (em dash, en dash). Usar virgula, ponto ou reestruturar a frase.
- Apenas aspas retas `"` e `'`.
- Acentuacao portuguesa correta em todo texto visivel.
- Nunca usar icones por emoji. Quando precisar de icone, usar SVG inline.
- Nunca usar cores fora da paleta `--hap-*`.

## Estrutura de projeto padrao

```
meu-app/
    app.py
    requirements.txt
    static/
        css/
            hap.css        <- copiar de flask-hap
        js/
            hap-charts.js  <- copiar de flask-hap
    templates/
        base.html          <- copiar de flask-hap
        index.html         <- estende base.html
```

Para apps com multiplas paginas usar Blueprints:

```
meu-app/
    app.py
    requirements.txt
    static/...
    templates/
        base.html
    modules/
        dashboard/
            __init__.py
            routes.py
            templates/
                dashboard/
                    index.html
```

## Setup base do app Flask

```python
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = "troque-em-producao"

@app.route("/")
def index():
    return render_template(
        "index.html",
        page_title="Nome do App",
        page_subtitle="Descricao curta do proposito do dashboard.",
    )

if __name__ == "__main__":
    app.run(debug=True)
```

## Template base (base.html)

O `base.html` do repositorio ja contem:
- Carregamento do `hap.css` e `hap-charts.js`
- Sidebar com logo e navegacao ativa via `request.endpoint`
- Flash messages do Flask com classes `.hap-alert`
- Header de pagina renderizado via `page_title` e `page_subtitle`
- Footer institucional
- Blocks: `title`, `nav`, `extra_css`, `content`, `footer_right`, `extra_js`

Sempre estender `base.html`:

```html
{% extends "base.html" %}

{% block title %}Hapvida | Nome do App{% endblock %}

{% block content %}
<!-- conteudo aqui -->
{% endblock %}

{% block extra_js %}
<script>
// graficos aqui
</script>
{% endblock %}
```

## Componentes disponiveis em hap.css

### KPI grid

```html
<div class="hap-kpi-grid">
    <div class="hap-kpi">
        <div class="kpi-label">Beneficiarios ativos</div>
        <div class="kpi-value">4,82 mi</div>
        <div class="kpi-delta up">+2,1% MoM</div>
    </div>
</div>
```

`kpi-delta` aceita classes `up` (verde) e `down` (vermelho).

### Titulo de secao

```html
<div class="hap-section-title">Indicadores clinicos</div>
```

### Card de conteudo

```html
<div class="hap-card">
    <div class="hap-card-title">Titulo do card</div>
    <!-- conteudo -->
</div>
```

### Badge

```html
<span class="hap-badge success">Concluido</span>
<span class="hap-badge danger">Pendente</span>
<span class="hap-badge warning">Em andamento</span>
<span class="hap-badge info">Info</span>
<span class="hap-badge primary">Destaque</span>
```

### Botoes

```html
<button class="hap-btn primary">Confirmar</button>
<button class="hap-btn secondary">Cancelar</button>
<a href="/rota" class="hap-btn primary">Link como botao</a>
```

### Formulario

```html
<div class="hap-form-group">
    <label class="hap-label">Nome do campo</label>
    <input type="text" class="hap-input" placeholder="Valor">
</div>
<div class="hap-form-group">
    <label class="hap-label">Selecao</label>
    <select class="hap-select">
        <option>Opcao 1</option>
    </select>
</div>
```

### Tabela

```html
<div class="hap-table-wrap">
    <table class="hap-table">
        <thead>
            <tr><th>Coluna</th></tr>
        </thead>
        <tbody>
            <tr><td>Valor</td></tr>
        </tbody>
    </table>
</div>
```

### Alerta

```html
<div class="hap-alert info">Mensagem informativa.</div>
<div class="hap-alert success">Operacao concluida.</div>
<div class="hap-alert danger">Erro critico.</div>
<div class="hap-alert warning">Atencao necessaria.</div>
```

### Grid de colunas

```html
<div class="hap-grid-2">  <!-- 2 colunas -->
    <div>...</div>
    <div>...</div>
</div>
<div class="hap-grid-3">  <!-- 3 colunas -->
    ...
</div>
```

## Graficos com Chart.js (hap-charts.js)

Funcoes disponiveis: `hapLineChart`, `hapBarChart`, `hapDonutChart`.

```html
<!-- No template -->
<canvas id="meu-grafico" height="200"></canvas>
```

```javascript
// No block extra_js
hapLineChart(
    document.getElementById("meu-grafico"),
    ["Jan", "Fev", "Mar"],
    [{ label: "Sinistralidade (%)", data: [74.2, 73.1, 72.4] }]
);

hapBarChart(
    document.getElementById("meu-grafico"),
    ["Unidade A", "Unidade B"],
    [{ label: "Consultas", data: [1200, 980] }]
);

hapDonutChart(
    document.getElementById("meu-grafico"),
    ["Clinica Geral", "Cardiologia", "Outros"],
    [38, 18, 44]
);
```

Os dados podem vir do Flask via `{{ dados | tojson }}`:

```python
# routes.py
return render_template("dashboard.html", dados={"meses": [...], "valores": [...]})
```

```javascript
// template
const dados = {{ dados | tojson }};
hapLineChart(ctx, dados.meses, [{ label: "Valor", data: dados.valores }]);
```

## Flash messages do Flask

```python
from flask import flash

flash("Operacao concluida com sucesso.", "success")
flash("Erro ao processar requisicao.", "danger")
flash("Verifique os dados antes de continuar.", "warning")
flash("Novo registro disponivel.", "info")
```

As mensagens aparecem automaticamente via `base.html` com estilo `.hap-alert`.

## Navegacao sidebar

No `base.html`, o block `nav` define os links da sidebar. Substituir ou estender no template filho:

```html
{% block nav %}
<div class="hap-nav-label">Principal</div>
<a href="{{ url_for('index') }}" class="{{ 'active' if request.endpoint == 'index' }}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    Dashboard
</a>
<div class="hap-nav-label">Analise</div>
<a href="{{ url_for('relatorio') }}" class="{{ 'active' if request.endpoint == 'relatorio' }}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
    </svg>
    Relatorio
</a>
{% endblock %}
```

## Layout padrao para dashboards

Estrutura recomendada para apps novos:

1. Header com faixa gradiente, titulo e subtitulo (via `page_title` e `page_subtitle`)
2. Linha de 3 ou 4 KPIs principais em `.hap-kpi-grid`
3. Secoes tematicas com `.hap-section-title`
4. Graficos Chart.js em `.hap-grid-2` ou `.hap-grid-3` dentro de `.hap-card`
5. Tabela detalhada em `.hap-table-wrap`
6. Footer institucional (automatico via `base.html`)

## Checklist antes de entregar

- Nenhum emoji em lugar algum do codigo ou da UI.
- `hap.css` carregado via `url_for('static', filename='css/hap.css')`.
- Todas as cores vem das variaveis `--hap-*`, nenhuma cor hardcoded fora da paleta.
- Fonte Inter aplicada via import no `hap.css`.
- Graficos usando `hapLineChart`, `hapBarChart` ou `hapDonutChart` do `hap-charts.js`.
- Textos em portugues com acentuacao correta.
- Sem travessao, sem aspas tipograficas, sem reticencias Unicode.
- Template estende `base.html` e usa o block `content`.
- App roda sem erros com `flask run` e layout nao quebra em 1280px.

## Execucao

1. Ler o requisito: tipo de app (dashboard, ferramenta, formulario), dados envolvidos, persona.
2. Definir layout: quantos KPIs, quantas secoes, precisa de tabs ou multiplas paginas.
3. Criar estrutura de arquivos comecando por `app.py` e copiando `base.html`, `hap.css`, `hap-charts.js`.
4. Implementar templates na ordem do layout.
5. Testar com `flask run` e validar visualmente.
6. Ajustar espacamentos, alinhar KPIs, conferir responsividade ate 1280px.
7. Entregar os arquivos e instrucao de execucao.

Refinamento e consistencia importam mais que ornamento. Um dashboard Hapvida bem feito parece discreto, mas cada detalhe esta no lugar certo.
