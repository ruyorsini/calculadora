document.getElementById('iseeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const familyMembers = parseInt(document.getElementById('familyMembers').value);
    const familyIncome = parseFloat(document.getElementById('familyIncome').value);
    const financialAssets = parseFloat(document.getElementById('financialAssets').value);
    const realEstateAssets = parseFloat(document.getElementById('realEstateAssets').value);

    // Validar inputs
    if (familyMembers < 1 || familyIncome < 0 || financialAssets < 0 || realEstateAssets < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Cálculo da Escala de Equivalência
    // Padrão: 1 para primeiro membro, +0.57 para cada membro adicional
    const scalaEquivalenza = 1 + (familyMembers - 1) * 0.57;

    // Cálculo do ISE (Indicador de Situação Econômica)
    // ISE = Renda + 20% Patrimônio Mobiliário + 20% Patrimônio Imobiliário
    const totalAssets = (financialAssets * 0.2) + (realEstateAssets * 0.2);
    const ise = familyIncome + totalAssets;

    // Cálculo do ISEE (ISE / Escala de Equivalência)
    const isee = ise / scalaEquivalenza;

    // Exibir resultado
    document.getElementById('iseeValue').textContent = `€ ${isee.toFixed(2)}`;
    document.getElementById('incomeDetail').textContent = `€ ${familyIncome.toFixed(2)}`;
    document.getElementById('assetDetail').textContent = `€ ${totalAssets.toFixed(2)}`;
    document.getElementById('scaleDetail').textContent = scalaEquivalenza.toFixed(2);

    // Mostrar seção de resultado
    document.getElementById('result').classList.remove('hidden');

    // Scroll para resultado
    setTimeout(function() {
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

function resetForm() {
    document.getElementById('iseeForm').reset();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('familyMembers').value = '1';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}