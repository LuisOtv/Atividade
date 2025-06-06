const params = new URLSearchParams(window.location.search);

const value = params.get("valor");
const bank = params.get("banco");
const months = params.get("parcelas");

atualizaPagina(value, months, bank);

// Formatar valor para o seguinte estilo: R$ 0,00
function formatarCampo(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
}

// Retorna o valor da taxa de acordo com o banco escolhido
function selecionaTaxa(banco) {
    switch (banco) {
        case "caixa":
            return 0.0487;
        case "santander":
            return 0.0567;
        case "bradesco":
            return 0.0532;
        case "itau":
            return 0.0519;
        case "nubank":
            return 0.0595;
        case "inter":
            return 0.0602;
        default:
            console.log("Valor inválido");
    }
}

// Calcula o valor total à pagar
function calculaValorTotal(valor_requerido, parcelas, banco) {
    // Verifica o valor da taxa de acordo com o banco
    const taxa = selecionaTaxa(banco);

    // Valor total recebe a primeira parcela
    const primeira_parcela = valor_requerido / parcelas + (valor_requerido / parcelas) * taxa;
    let valor_total = primeira_parcela;

    // Para cada numero de parcelas, soma o valor acumulado mais valor acumulado * taxa
    for (let i = 1; i < parcelas; i++) {
        valor_total += valor_total * taxa;
    }

    // Returna o total
    return { primeira_parcela, valor_total };
}

function atualizaPagina(valor_requerido, parcelas, banco) {
    const { primeira_parcela, valor_total } = calculaValorTotal(valor_requerido, parcelas, banco);

    // Coloca os valores no DOM
    document.querySelector(".result-one").innerHTML = formatarCampo(primeira_parcela);

    document.querySelector(".result-two").innerHTML = formatarCampo(valor_total);
}
