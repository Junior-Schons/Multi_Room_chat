// Importando as funções necessárias do módulo express-validator
const { body, validationResult } = require("express-validator");

// Definindo as regras de validação como um array de middlewares
const validationRules = [
    // Verifica se o campo 'apelido' não está vazio
    body('apelido').notEmpty().withMessage('É necessario preencher o campo'),
    // Verifica se o campo 'apelido' tem entre 3 e 15 caracteres
    body('apelido').isLength({min: 3 , max: 15}).withMessage('Precisa ter entre 3 e 15 caracteres')
];

// Exportando a função iniciaChat
module.exports.iniciaChat = (application, req, res) => {
    // Obtendo o resultado da validação da requisição
    const errors = validationResult(req);
    // Se houver erros de validação
    if (!errors.isEmpty()) {
        // Extrai as mensagens de erro
        const errorMessages = errors.array().map(error => error.msg);
        // Renderiza a view 'index' com as mensagens de erro
        res.render('index', {validacao: errorMessages});

        // Interrompe a execução da função
        return;
    }

    // Obtém os dados do formulário da requisição
    const dadosForm = req.body;

    application.get('io').emit(
        'Mensagem para o cliente',
        {apelido: dadosForm.apelido, mensagem: 'acabou de entrar'}
        )
        
    // Renderiza a view 'chat'
    res.render('chat', {dadosForm : dadosForm})
};

// Exporta também as regras de validação
module.exports.validationRules = validationRules;
