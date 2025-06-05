import pandas as pd
import re

def calcular_dv_cnpj_base(cnpj_base):
    """
    Recebe um CNPJ base (12 dígitos), remove caracteres não numéricos,
    e retorna os dois dígitos verificadores calculados.
    """
    cnpj_base = re.sub(r'\D', '', str(cnpj_base))
    if len(cnpj_base) != 12:
        return 'Base inválida'
    pesos1 = [5,4,3,2,9,8,7,6,5,4,3,2]
    soma1 = sum(int(d) * p for d, p in zip(cnpj_base, pesos1))
    resto1 = soma1 % 11
    dv1 = 0 if resto1 < 2 else 11 - resto1
   
    cnpj_13 = cnpj_base + str(dv1)
    pesos2 = [6] + pesos1
    soma2 = sum(int(d) * p for d, p in zip(cnpj_13, pesos2))
    resto2 = soma2 % 11
    dv2 = 0 if resto2 < 2 else 11 - resto2
    return f"{dv1}{dv2}"

df = pd.read_csv('empresas.csv')
df.columns = df.columns.str.strip()

def extrair_base_cnpj(cnpj):
    cnpj_str = re.sub(r'\D', '', str(cnpj))
    if len(cnpj_str) < 12:
        return ''
    return cnpj_str[:12]
    
    def completar_cnpj(cnpj_base):
    filial = '0001'
    base_cnpj = cnpj_base + filial
    dv = calcula_dv_cnpj(base_cnpj)
    cnpj_completo = base_cnpj + dv
    return cnpj_completo

df['Base CNPJ'] = df['CNPJ'].apply(extrair_base_cnpj)
df['DV Calculado'] = df['Base CNPJ'].apply(calcular_dv_cnpj_base)

print("\nCálculo dos dígitos verificadores para cada base de CNPJ:")
print(df[['Nome da empresa', 'CNPJ', 'Base CNPJ', 'DV Calculado']].to_string(index=False))

df.to_excel('cnpjs_bases_com_dv.xlsx', index=False)
print("\nArquivo 'cnpjs_bases_com_dv.xlsx' gerado com sucesso!")




