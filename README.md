# Aprovisionamiento de Máquina Virtual (EC2) con Pulumi

Proyecto de Infraestructura como Código (IaC) para desplegar una máquina virtual en AWS (Amazon Linux 2023) con servidor web utilizando **Pulumi** y **TypeScript**.

---

## 🚀 Datos de la Instancia Desplegada

| Recurso | Detalle |
|---|---|
| **ID de Instancia** | `i-0a856564b96289c37` |
| **IP Pública** | `107.23.155.235` |
| **DNS Público** | `ec2-107-23-155-235.compute-1.amazonaws.com` |
| **URL Web** | [http://107.23.155.235](http://107.23.155.235) |
| **Sistema Operativo** | Amazon Linux 2023 (AMI oficial x86_64) |
| **Tipo de Instancia** | `t3.micro` |
| **Región AWS** | `us-east-1` (N. Virginia) |

---

## 📁 Estructura del Proyecto

- `index.ts`: Código TypeScript que describe la VPC, Security Group, Script de arranque (User Data) e Instancia EC2.
- `Pulumi.yaml`: Manifiesto principal del proyecto Pulumi.
- `Pulumi.dev.yaml`: Configuración del stack `dev` (región, variables).
- `package.json` & `tsconfig.json`: Dependencias y configuración de TypeScript.

---

## 🛠️ Comandos de Gestión

Para ejecutar comandos de Pulumi en esta máquina mediante PowerShell:

### 1. Ver el estado y outputs
```powershell
$env:PULUMI_CONFIG_PASSPHRASE = "pulumi123"
& "C:\Program Files (x86)\Pulumi\pulumi.exe" stack output
```

### 2. Previsualizar cambios
```powershell
$env:PULUMI_CONFIG_PASSPHRASE = "pulumi123"
& "C:\Program Files (x86)\Pulumi\pulumi.exe" preview
```

### 3. Aplicar cambios tras modificar `index.ts`
```powershell
$env:PULUMI_CONFIG_PASSPHRASE = "pulumi123"
& "C:\Program Files (x86)\Pulumi\pulumi.exe" up
```

### 4. Destruir los recursos cuando ya no los necesites (para no generar costos en AWS)
```powershell
$env:PULUMI_CONFIG_PASSPHRASE = "pulumi123"
& "C:\Program Files (x86)\Pulumi\pulumi.exe" destroy
```
